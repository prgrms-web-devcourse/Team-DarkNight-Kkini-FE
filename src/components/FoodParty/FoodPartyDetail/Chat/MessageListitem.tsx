import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { Message } from 'types/foodParty';
import { templatePromiseDate } from 'utils/helpers/foodParty';

const MessageListItem = ({
  message,
  currentUserId,
}: {
  message: Message;
  currentUserId: number;
}) => {
  const isCurrentUser = getIsCurrentUser(message.userId, currentUserId);
  const [year, month, day, hour, minute] = message.createdAt;

  return (
    <>
      {message.isFirstMessageOfThatDay && (
        <Flex
          justifyContent='center'
          alignItems='center'
          _notFirst={{
            marginTop: '2rem',
          }}>
          <Box
            textAlign='center'
            fontSize='12px'
            backgroundColor='white'
            borderRadius='1rem'
            fontWeight='extrabold'
            padding='0.5rem'>
            {templatePromiseDate(year, month, day)}
          </Box>
        </Flex>
      )}
      <Flex
        width='100%'
        flexDirection={isCurrentUser ? 'row-reverse' : 'row'}
        gap='0.5rem'>
        <Flex flexDirection='column' maxWidth='80%'>
          {!isCurrentUser && (
            <Flex alignItems='center' gap='0.5rem'>
              <Avatar src={message.profileImgUrl} size='xs' marginBottom='-0.5rem' />
              <Text fontSize='14px'>{message.username}</Text>
            </Flex>
          )}

          <Flex flexDirection={isCurrentUser ? 'row-reverse' : 'row'} gap='0.5rem'>
            <Text
              marginLeft={!isCurrentUser ? '0.5rem' : '0'}
              backgroundColor={isCurrentUser ? 'orange.200' : 'white'}
              fontWeight={isCurrentUser ? 'extrabold' : 'medium'}
              padding='0.5rem 0.75rem'
              borderRadius={isCurrentUser ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem'}
              fontSize='12px'>
              {message.content}
            </Text>
            <Text flex={1} fontSize='10px' alignSelf='flex-end' whiteSpace='nowrap'>
              {templateTime(hour, minute)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default MessageListItem;

const getIsCurrentUser = (targetUserId: number, currentUserId: number) =>
  targetUserId === currentUserId;

const templateTime = (hour: number, minute: number) => {
  const minuteStartWithZero = String(minute).padStart(2, '0');

  if (hour === 0) return `오전 12:${minuteStartWithZero}`;
  if (hour === 12) return `오후 12:${minuteStartWithZero}`;
  if (hour > 12)
    return `오후 ${String(hour - 12).padStart(2, '0')}:${minuteStartWithZero}`;

  return `오전 ${String(hour).padStart(2, '0')}:${minuteStartWithZero}`;
};
