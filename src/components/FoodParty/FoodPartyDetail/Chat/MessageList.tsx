import { Flex } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { Message } from 'types/foodParty';

import MessageListItem from './MessageListitem';

type MessageListProps = {
  messageList: Message[];
  currentUserId: number;
};

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  (
    { messageList, currentUserId }: { messageList: Message[]; currentUserId: number },
    ref
  ) => {
    return (
      <Flex
        ref={ref}
        flexDirection='column'
        flex={1}
        gap='0.75rem'
        padding='1rem 1rem 5rem 1rem'
        overflowY='auto'
        backgroundColor='#f2f2f2'>
        {messageList.map((message) => (
          <MessageListItem
            key={message.id}
            message={message}
            currentUserId={currentUserId}
          />
        ))}
      </Flex>
    );
  }
);

MessageList.displayName = 'MessageList';

export default MessageList;
