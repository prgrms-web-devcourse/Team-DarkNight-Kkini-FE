import { Flex } from '@chakra-ui/react';
import { Message } from 'types/foodParty';

import MessageListItem from './MessageListitem';

const MessageList = ({
  messageList,
  currentUserId,
}: {
  messageList: Message[];
  currentUserId: number;
}) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log(messageList);

  return (
    <Flex
      flexDirection='column'
      flex={1}
      gap='0.75rem'
      padding='1rem 1rem 5rem 1rem'
      overflowY='auto'
      backgroundColor='#f2f2f2'>
      {messageList.map((message) => (
        <MessageListItem
          key={getUniqueMessageKey(message.createdAt)}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
    </Flex>
  );
};

export default MessageList;

const getUniqueMessageKey = (createdAt: number[]) =>
  createdAt.map((time) => String(time)).join('');
