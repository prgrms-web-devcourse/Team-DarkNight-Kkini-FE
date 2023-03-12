import { Flex } from '@chakra-ui/react';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { axiosAuthApi } from 'apis/axios';
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
  const { data: messageListWhenEntered, isLoading } = useGetFoodPartyMessageList(roomId);
  const { data: userInformation } = useGetUser();

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
    if (messageListWhenEntered) setMessageList(messageListWhenEntered);
  }, [messageListWhenEntered]);

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
          // console.log(JSON.parse(payload.body));
        });

        // const chatRequest = {
        //   content: '끼니끼니끼니끼니',
        //   type: 'CHAT',
        //   userId: 12,
        // };

        // client.current?.send(
        //   `/app/chat.sendMessage/${roomId}`,
        //   {},
        //   JSON.stringify(chatRequest)
        // );
      }
    );

    return () => {
      client.current?.disconnect(() => {
        subscribe?.unsubscribe();
      });
    };
  }, []);

  // ref.current.value = '';

  return (
    <Flex position='relative' flexDirection='column' height='100%'>
      {/* 채팅 리스트 */}
      <MessageList messageList={messageList} />
      {/* 인풋 창 */}
      <MessageInput ref={messageInputRef} />
    </Flex>
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
