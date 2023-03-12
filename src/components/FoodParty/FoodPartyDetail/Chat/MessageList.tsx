import { Flex } from '@chakra-ui/react';
import { Message } from 'types/foodParty';

import MessageListItem from './MessageListitem';

const getUniqueMessageKey = (createdAt: number[]) =>
  createdAt.map((time) => String(time)).join('');

const MessageList = ({ messageList }: { messageList: Message[] }) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log(messageList);

  return (
    <Flex flexDirection='column' flex={1} padding='1rem' backgroundColor='subBackground'>
      {messageList.map((message) => (
        <MessageListItem key={getUniqueMessageKey(message.createdAt)} message={message} />
      ))}
    </Flex>
  );
};

export default MessageList;
