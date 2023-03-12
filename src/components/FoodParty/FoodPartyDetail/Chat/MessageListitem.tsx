import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Message } from 'types/foodParty';

const MessageListItem = ({
  message,
  currentUserId,
}: {
  message: Message;
  currentUserId: number;
}) => {
  const isCurrentUser = getIsCurrentUser(message.userId, currentUserId);

  return (
    <Flex
      flexDirection='column'
      maxWidth='80%'
      alignSelf={isCurrentUser ? 'flex-end' : 'flex-start'}>
      {!isCurrentUser && (
        <Flex alignItems='center' gap='0.5rem'>
          <Avatar src={message.profileImgUrl} size='xs' marginBottom='-0.5rem' />
          <Text fontSize='14px'>{message.username}</Text>
        </Flex>
      )}
      <Text
        marginLeft={!isCurrentUser ? '0.5rem' : '0'}
        backgroundColor={isCurrentUser ? 'primary' : 'white'}
        color={isCurrentUser ? 'white' : 'black'}
        fontWeight={isCurrentUser ? '700' : '300'}
        padding='1rem 0.5rem'
        borderRadius={isCurrentUser ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem'}
        fontSize='12px'>
        {message.content}
      </Text>
    </Flex>
  );
};

export default MessageListItem;

const getIsCurrentUser = (targetUserId: number, currentUserId: number) =>
  targetUserId === currentUserId;
