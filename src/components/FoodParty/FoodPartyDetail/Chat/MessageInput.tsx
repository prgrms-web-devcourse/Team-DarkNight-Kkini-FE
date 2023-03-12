import { Box, Flex, Input } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { IoIosSend } from 'react-icons/io';

type MessageInputProps = {
  onSendMessage: () => void;
};

const MessageInput = forwardRef<HTMLInputElement, MessageInputProps>(
  ({ onSendMessage }, ref) => {
    return (
      <Flex
        position='absolute'
        bottom='0'
        width='100%'
        alignItems='center'
        borderRadius='1rem 1rem 0 0'
        boxShadow='0px -1px 2px 1px rgba(0,0,0,0.1);'
        backgroundColor='white'
        padding='1rem'>
        <Box position='relative' width='100%'>
          <Input
            ref={ref}
            fontSize='1rem'
            backgroundColor='subBackground'
            borderRadius='1rem'
            border='none'
            placeholder='메세지를 입력해주세요.'
          />
          <Flex
            onClick={onSendMessage}
            zIndex={10}
            justifyContent='center'
            alignItems='center'
            borderRadius='50%'
            padding='5px 6px 5px 5px'
            backgroundColor='primary'
            color='white'
            position='absolute'
            top='50%'
            right='0.5rem'
            transform='translateY(-50%)'>
            <IoIosSend />
          </Flex>
        </Box>
      </Flex>
    );
  }
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;
