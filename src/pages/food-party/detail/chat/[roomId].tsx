import { CompatClient, Stomp } from '@stomp/stompjs';
import { axiosAuthApi } from 'apis/axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

const FoodPartyDetailChat = () => {
  const router = useRouter();
  const client = useRef<CompatClient>();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const { roomId } = router.query;
    if (!roomId) return;

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
        client.current?.subscribe(`/topic/public/${roomId as string}`, (payload) => {
          // const message = JSON.parse(payload.body);
        });
      }
    );
  }, []);

  return <div></div>;
};

export default FoodPartyDetailChat;
