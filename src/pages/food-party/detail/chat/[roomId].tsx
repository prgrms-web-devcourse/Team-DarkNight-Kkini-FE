import { Flex } from '@chakra-ui/react';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { axiosAuthApi } from 'apis/axios';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import MessageInput from 'components/FoodParty/FoodPartyDetail/Chat/MessageInput';
import MessageList from 'components/FoodParty/FoodPartyDetail/Chat/MessageList';
import { useGetFoodPartyMessageList } from 'hooks/query/useFoodParty';
import { useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Message, ReceivedMessage } from 'types/foodParty';
import { getNumberArrayCreatedAt } from 'utils/helpers/foodParty';

const FoodPartyDetailChat = ({ roomId }: { roomId: string }) => {
  const client = useRef<CompatClient>();
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingToConnectSocket, setIsLoadingToConnectSocket] = useState(true);
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

  console.log(messageList);

  const handleSendMessage = () => {
    if (
      !client.current ||
      !messageInputRef.current ||
      !userInformation ||
      // 빈 텍스트 일 때
      !messageInputRef.current.value
    )
      return;

    const sendMessageRequest = {
      content: messageInputRef.current.value,
      type: 'CHAT',
      userId: userInformation.id,
    };

    client.current.send(
      `/app/chat.sendMessage/${roomId}`,
      {},
      JSON.stringify(sendMessageRequest)
    );

    messageInputRef.current.value = '';
  };

  // 기존 메시지 이력
  useEffect(() => {
    if (existingMessageList) setMessageList(existingMessageList);
  }, [existingMessageList]);

  useEffect(() => {
    if (!userInformation) return;

    client.current = Stomp.over(
      () => new SockJS(`${process.env.NEXT_PUBLIC_API_END_POINT}/ws`)
    );
    // console에 디버깅 찍히는 기능 제거.
    client.current.debug = () => {};

    const axiosAuthApiAuthorization =
      axiosAuthApi.defaults.headers.common['Authorization'];

    let subscribe: StompSubscription | undefined;
    client.current.connect(
      {
        Authorization: axiosAuthApiAuthorization,
      },
      () => {
        subscribe = client.current?.subscribe(`/topic/public/${roomId}`, (payload) => {
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
      }
    );
    setIsLoadingToConnectSocket(false);

    return () => {
      client.current?.disconnect(() => {
        subscribe?.unsubscribe();
      });
    };
  }, []);

  if (
    isLoadingGettingExistingMessageList ||
    isLoadingGettingUserInformation ||
    isLoadingToConnectSocket
  )
    return <div>Loading...</div>;
  if (errorGettingExistingMessageList)
    return <div>{errorGettingExistingMessageList.toString()}</div>;
  if (errorGettingUserInformation)
    return <div>{errorGettingUserInformation.toString()}</div>;

  return (
    <>
      {isSuccessGettingExistingMessageList && isSuccessGettingUserInformation ? (
        <Flex position='relative' flexDirection='column' height='100%'>
          <MessageList messageList={messageList} currentUserId={userInformation.id} />
          <MessageInput ref={messageInputRef} onSendMessage={handleSendMessage} />
        </Flex>
      ) : (
        <GoHomeWhenErrorInvoked />
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
