import { Flex } from '@chakra-ui/react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { axiosAuthApi } from 'apis/axios';
import { useGetFoodPartyMessageList } from 'hooks/query/useFoodParty';
import { useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Message } from 'types/foodParty';

const FoodPartyDetailChat = ({ roomId }: { roomId: string }) => {
  const client = useRef<CompatClient>(null);
  const messageInput = useRef<>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const { data: messageListWhenEntered } = useGetFoodPartyMessageList(roomId);
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

  useEffect(() => {
    if (messageListWhenEntered) setMessageList(messageListWhenEntered);
  }, [messageListWhenEntered]);

  useEffect(() => {
    client.current = Stomp.over(
      () => new SockJS(`${process.env.NEXT_PUBLIC_API_END_POINT}/ws`)
    );

    const axiosAuthApiAuthorization =
      axiosAuthApi.defaults.headers.common['Authorization'];

    client.current.connect(
      {
        Authorization: axiosAuthApiAuthorization,
      },
      () => {
        client.current?.subscribe(`/topic/public/${roomId}`, (payload) => {
          // console.log(JSON.parse(payload.body));
        });

        const chatRequest = {
          content: '끼니끼니끼니끼니',
          type: 'CHAT',
          userId: 12,
        };

        client.current?.send(
          `/app/chat.sendMessage/${roomId}`,
          {},
          JSON.stringify(chatRequest)
        );
      }
    );
  }, []);

  // ref.current.value = '';

  return (
    <Flex>
      {/* 채팅 리스트 */}
      {/* <MessageList /> */}

      {/* 인풋 창 */}
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
