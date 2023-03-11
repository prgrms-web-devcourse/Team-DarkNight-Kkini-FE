import { CompatClient, Stomp } from '@stomp/stompjs';
import { axiosAuthApi } from 'apis/axios';
import { useGetFoodPartyMessageList } from 'hooks/query/useFoodParty';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Message } from 'types/foodParty';

const FoodPartyDetailChat = ({ roomId }: { roomId: string }) => {
  const router = useRouter();
  const client = useRef<CompatClient>();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const { data: messageListWhenEntered } = useGetFoodPartyMessageList(roomId);

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
          console.log(payload);
        });
      }
    );
  }, []);

  return <div></div>;
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
