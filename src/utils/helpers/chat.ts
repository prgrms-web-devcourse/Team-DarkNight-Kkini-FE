import { CompatClient } from '@stomp/stompjs';

export const sendMessage = ({
  client,
  roomId,
  userId,
  content,
}: {
  client: CompatClient;
  roomId: string;
  userId: number;
  content: string;
}) => {
  const sendMessageRequest = {
    content,
    type: 'CHAT',
    userId,
  };

  client.send(`/app/chat.sendMessage/${roomId}`, {}, JSON.stringify(sendMessageRequest));
};
