import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Message } from 'types/foodParty';

const MessageListItem = ({ message }: { message: Message }) => {
  return (
    <Flex flexDirection='column' width='80%'>
      <Flex alignItems='center' gap='0.5rem'>
        <Avatar src={message.profileImgUrl} size='xs' marginBottom='-0.5rem' />
        <Text fontSize='14px'>{message.username}</Text>
      </Flex>
      <Text backgroundColor='white' padding='0.5rem' fontSize='12px'>
        {message.content}
      </Text>
    </Flex>
  );
};

export default MessageListItem;
