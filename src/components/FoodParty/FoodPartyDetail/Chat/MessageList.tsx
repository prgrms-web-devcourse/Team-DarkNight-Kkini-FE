import { Flex, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FoodPartyStatus, Message } from 'types/foodParty';
import { getMessageListCheckedIsFirstMessageOfThatDay } from 'utils/helpers/chat';

import MessageListItem from './MessageListitem';

type MessageListProps = {
  status: FoodPartyStatus;
  messageList: Message[];
  currentUserId: number;
};

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ status, messageList, currentUserId }, ref) => {
    const messageListCheckedIsFirstMessageOfThatDay =
      getMessageListCheckedIsFirstMessageOfThatDay(messageList);

    return (
      <Flex
        ref={ref}
        flexDirection='column'
        flex={1}
        gap='0.75rem'
        padding='1rem 1rem 5rem 1rem'
        overflowY='auto'
        backgroundColor='#f2f2f2'>
        {messageListCheckedIsFirstMessageOfThatDay.map((message) => (
          <MessageListItem
            key={message.id}
            message={message}
            currentUserId={currentUserId}
          />
        ))}
        {status === '식사 완료' && (
          <Text fontSize='14px' textAlign='center' marginTop='1rem'>
            식사가 종료되었습니다.
          </Text>
        )}
      </Flex>
    );
  }
);

MessageList.displayName = 'MessageList';

export default MessageList;
