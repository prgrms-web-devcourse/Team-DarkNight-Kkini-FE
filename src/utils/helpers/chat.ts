import { CompatClient } from '@stomp/stompjs';
import { Member, Message } from 'types/foodParty';

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

export const getIsCurrentUser = (targetUserId: number, currentUserId: number) =>
  targetUserId === currentUserId;

export const templateTime = (hour: number, minute: number) => {
  const minuteStartWithZero = String(minute).padStart(2, '0');

  if (hour === 0) return `오전 12:${minuteStartWithZero}`;
  if (hour === 12) return `오후 12:${minuteStartWithZero}`;
  if (hour > 12)
    return `오후 ${String(hour - 12).padStart(2, '0')}:${minuteStartWithZero}`;

  return `오전 ${String(hour).padStart(2, '0')}:${minuteStartWithZero}`;
};

export const getSpecificUser = (memberList: Member[], userId: number) => {
  const userData = memberList.filter((member) => member.userId === userId);
  if (!userData[0]) {
    return {
      nickname: '퇴장한 사용자',
      profileImgUrl: '', // chakra avatar에서 사용하기때문에 url 없으면 기본 이미지가 적용됨
    };
  }
  return userData[0];
};
