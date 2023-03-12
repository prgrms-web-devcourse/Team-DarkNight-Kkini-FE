import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Message } from 'types/foodParty';

const MessageListItem = ({ message }: { message: Message }) => {
  return (
    <Flex flexDirection='column'>
      <Avatar src={message.profileImgUrl} />
      <Text>{message.content}</Text>
    </Flex>
  );
};

export default MessageListItem;
