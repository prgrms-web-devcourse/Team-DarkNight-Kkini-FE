import { Flex, Text } from '@chakra-ui/react';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { axiosAuthApi } from 'apis/axios';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import MessageInput from 'components/FoodParty/FoodPartyDetail/Chat/MessageInput';
import MessageList from 'components/FoodParty/FoodPartyDetail/Chat/MessageList';
import {
  useGetFoodPartyDetail,
  useGetFoodPartyMessageList,
} from 'hooks/query/useFoodParty';
import { useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Message, ReceivedMessage } from 'types/foodParty';
import { sendMessage } from 'utils/helpers/chat';
import { getNumberArrayCreatedAt } from 'utils/helpers/foodParty';

const FoodPartyDetailChat = ({ roomId }: { roomId: string }) => {
  const client = useRef<CompatClient>();
  const messageListRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingToConnectSocket, setIsLoadingToConnectSocket] = useState(true);
  const [isErrorConnectingSocket, setIsErrorConnectingSocket] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const {
    data: existingMessageList,
    isLoading: isLoadingGettingExistingMessageList,
    isSuccess: isSuccessGettingExistingMessageList,
    error: errorGettingExistingMessageList,
  } = useGetFoodPartyMessageList(roomId);
  const {
    data: userInformation,
    isLoading: isLoadingGettingUserInformation,
    isSuccess: isSuccessGettingUserInformation,
    error: errorGettingUserInformation,
  } = useGetUser();
  const {
    data: foodPartyDetail,
    isLoading: isLoadingGettingFoodPartyDetail,
    isSuccess: isSuccessGettingFoodPartyDetail,
    error: errorGettingFoodPartyDetail,
  } = useGetFoodPartyDetail(roomId, userInformation?.id);

  const handleSendMessage = (event?: KeyboardEvent<HTMLInputElement>) => {
    if (
      !client.current ||
      !messageInputRef.current ||
      !userInformation ||
      !messageInputRef.current.value // empty string
    )
      return;

    // 키보드로 enter를 눌러 메세지를 보낼 때 유효성 검사.
    // enter 키가 아니거나 shift + enter를 하면 메세지를 보낼 수 없도록 함.
    if (event) {
      if (event.key !== 'Enter' || (event.shiftKey && event.key === 'Enter')) return;
    }

    sendMessage({
      client: client.current,
      roomId,
      userId: userInformation.id,
      content: messageInputRef.current.value,
    });

    messageInputRef.current.value = '';
  };

  // 기존 메시지 이력
  useEffect(() => {
    if (existingMessageList) setMessageList(existingMessageList);
  }, [existingMessageList]);

  useEffect(() => {
    if (!userInformation) return;
    if (foodPartyDetail?.crewStatus === '식사 완료') {
      setIsLoadingToConnectSocket(false);
      return;
    }

    // 소켓 client 생성
    client.current = Stomp.over(
      () => new SockJS(`${process.env.NEXT_PUBLIC_API_END_POINT}/ws`)
    );
    // console에 디버깅 찍히는 기능 제거.
    client.current.debug = () => {};

    const axiosAuthApiAuthorization =
      axiosAuthApi.defaults.headers.common['Authorization'];

    // 서버와 소켓 통신 연결
    let subscription: StompSubscription | undefined;
    client.current.connect(
      {
        Authorization: axiosAuthApiAuthorization,
      },
      // 연결 시 + 소켓 서버에서 publish하면 다음 callback 함수 실행
      () => {
        subscription = client.current?.subscribe(`/topic/public/${roomId}`, (payload) => {
          const receivedMessage = JSON.parse(payload.body) as ReceivedMessage;
          if (receivedMessage.type === 'LEAVE' || receivedMessage.type === 'JOIN') return;

          const newReceivedMessage: Message = {
            ...receivedMessage,
            createdAt: getNumberArrayCreatedAt(receivedMessage.createdAt),
          };

          setMessageList((previousMessageList) => [
            ...previousMessageList,
            newReceivedMessage,
          ]);
        });
      },
      // 에러 발생 시 다음 callback 함수 실행
      () => {
        setIsErrorConnectingSocket(true);
      }
    );
    setIsLoadingToConnectSocket(false);

    return () => {
      // unmount될 때 소켓 연결 끊음.
      client.current?.disconnect(() => {
        subscription?.unsubscribe();
      });
    };
  }, []);

  // 스크롤 항상 아래로 유지하기.
  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  });

  if (
    isLoadingGettingExistingMessageList ||
    isLoadingGettingUserInformation ||
    isLoadingToConnectSocket ||
    isLoadingGettingFoodPartyDetail
  )
    // To Do: 스켈레톤 작업 필요 by 승준
    return <div>Loading...</div>;
  if (
    errorGettingExistingMessageList ||
    errorGettingExistingMessageList ||
    errorGettingUserInformation ||
    errorGettingFoodPartyDetail
  )
    return <GoHomeWhenErrorInvoked />;

  return (
    <>
      {!isErrorConnectingSocket &&
      isSuccessGettingExistingMessageList &&
      isSuccessGettingUserInformation &&
      isSuccessGettingFoodPartyDetail ? (
        <Flex position='relative' flexDirection='column' height='100%'>
          <MessageList
            status={foodPartyDetail.crewStatus}
            ref={messageListRef}
            messageList={messageList}
            currentUserId={userInformation.id}
          />
          {foodPartyDetail.crewStatus !== '식사 완료' && (
            <MessageInput ref={messageInputRef} onSendMessage={handleSendMessage} />
          )}
        </Flex>
      ) : (
        <GoHomeWhenErrorInvoked
          errorText={isErrorConnectingSocket ? '채팅 연결에 실패했습니다.' : ''}
        />
      )}
    </>
  );
};

export default FoodPartyDetailChat;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { roomId } = context.query;

  return {
    props: {
      roomId,
    },
  };
};
