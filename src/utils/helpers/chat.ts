import { CompatClient } from '@stomp/stompjs';
import { Message } from 'types/foodParty';

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

export const getMessageListCheckedIsFirstMessageOfThatDay = (messageList: Message[]) => {
  const newMessageList: Message[] = [];

  messageList.forEach((currentMessage, index) => {
    // 첫 번째 메세지인 경우
    if (!index) {
      newMessageList.push({
        ...currentMessage,
        createdAt: [...currentMessage.createdAt],
        isFirstMessageOfThatDay: true,
      });
      return;
    }

    const [, , beforeDay] = messageList[index - 1].createdAt;
    const [, , currentDay] = currentMessage.createdAt;

    newMessageList.push({
      ...currentMessage,
      createdAt: [...currentMessage.createdAt],
      // day가 달라지는 시점(그 날의 첫 번째 메세지)
      isFirstMessageOfThatDay: beforeDay !== currentDay,
    });
  });

  return newMessageList;
};
