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
import { Message } from 'types/foodParty';

const FoodPartyDetailChat = ({ roomId }: { roomId: string }) => {
  const client = useRef<CompatClient>();
  const messageInputRef = useRef<HTMLInputElement>(null);
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

  const sendMessage = (content: string) => {
    if (!client.current || !userInformation) return;

    const sendMessageRequest = {
      content,
      type: 'CHAT',
      userId: userInformation.id,
    };

    client.current.send(
      `/app/chat.sendMessage/${roomId}`,
      {},
      JSON.stringify(sendMessageRequest)
    );
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

    const axiosAuthApiAuthorization =
      axiosAuthApi.defaults.headers.common['Authorization'];

    let subscribe: StompSubscription | undefined;
    client.current.connect(
      {
        Authorization: axiosAuthApiAuthorization,
      },
      () => {
        subscribe = client.current?.subscribe(`/topic/public/${roomId}`, (payload) => {
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
          console.log(JSON.parse(payload.body));
        });
      }
    );

    return () => {
      client.current?.disconnect(() => {
        subscribe?.unsubscribe();
      });
    };
  }, []);

  if (isLoadingGettingExistingMessageList || isLoadingGettingUserInformation)
    return <div>Loading...</div>;
  if (errorGettingExistingMessageList)
    return <div>{errorGettingExistingMessageList.toString()}</div>;
  if (errorGettingUserInformation)
    return <div>{errorGettingUserInformation.toString()}</div>;

  return (
    <>
      {isSuccessGettingExistingMessageList && isSuccessGettingUserInformation ? (
        <Flex position='relative' flexDirection='column' height='100%'>
          {/* 채팅 리스트 */}
          <MessageList messageList={messageList} />
          {/* 인풋 창 */}
          <MessageInput ref={messageInputRef} />
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
