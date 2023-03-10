import { Flex, FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import BottomDrawer from 'components/common/BottomDrawer';
import Button from 'components/common/Button';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

type FoodPartyApplicationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickSubmitButton: UseMutateFunction<
    {
      id: number;
    },
    unknown,
    string,
    unknown
  >;
};

type FormType = {
  text: string;
};

const FoodPartyApplicationDrawer = ({
  isOpen,
  onClose,
  onClickSubmitButton,
}: FoodPartyApplicationDrawerProps) => {
  const { register, handleSubmit } = useForm<FormType>();
  const onSubmit = (data: FormType) => {
    onClickSubmitButton(data.text, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Flex justify='space-between'>
          <Text fontSize='1.2rem'>신청서</Text>
          <Image
            src='/images/delete-btn.svg'
            alt='신청서 창닫기'
            onClick={onClose}
            width='25'
            height='25'
          />
        </Flex>
      }
      body={
        <FormControl as='form' px={5} pb={5} onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>얼마나 끼니를 함께하고 싶은지 어필해주세요!</FormLabel>
          <Textarea
            mt={1}
            placeholder='신청서 내용을 입력해주세요!'
            {...register('text', {
              required: true,
              minLength: 1,
            })}
          />
          <Button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            style={{
              background: 'primary',
              marginTop: '1rem',
              color: 'white',
              fontWeight: 700,
              boxShadow: '0px 0px 5px #888',
            }}>
            신청서 전송
          </Button>
        </FormControl>
      }></BottomDrawer>
  );
};

export default FoodPartyApplicationDrawer;
