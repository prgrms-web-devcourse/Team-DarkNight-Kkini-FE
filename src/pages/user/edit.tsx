import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import Button from 'components/common/Button';
import UserIconForm from 'components/User/Edit/UserIconForm';
import { useGetUser, useUpdateMyProfile } from 'hooks/query/useUser';
import { useForm } from 'react-hook-form';

const MyProfileEditPage = () => {
  const { data, isSuccess } = useGetUser();
  const { mutate } = useUpdateMyProfile(data?.id as number);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      profileImgUrl: data?.profileImgUrl,
      nickName: data?.nickname,
      introduction: data?.introduction,
    },
  });

  const setProfileImage = (url: string) => {
    setValue('profileImgUrl', url);
  };

  const onSubmit: Parameters<typeof handleSubmit>[0] = ({
    introduction,
    nickName,
    profileImgUrl,
  }) => {
    const body = {
      introduction,
      nickName,
      profileImgUrl,
    };
    mutate(body);
  };

  return (
    isSuccess && (
      <Flex justify='center' align='center' h='100%' bgColor='subBackground'>
        <Flex
          direction='column'
          bgColor='white'
          w='90%'
          h='95%'
          borderRadius={8}
          p='1rem 1.5rem'>
          <Heading fontSize='2xl'>프로필 수정</Heading>
          <form>
            <VStack h='3rem' spacing='1rem'>
              <UserIconForm imgSrc={data.profileImgUrl} setValue={setProfileImage} />
              <FormControl isRequired isInvalid={!!errors.nickName}>
                <FormLabel htmlFor='nickname'>닉네임</FormLabel>
                <Input
                  id='nickname'
                  placeholder='닉네임을 입력해주세요'
                  type='text'
                  {...register('nickName', {
                    required: '닉네임을 채워주세요',
                    minLength: {
                      value: 2,
                      message: '닉네임을 2자 이상 적어주세요',
                    },
                    maxLength: {
                      value: 7,
                      message: '닉네임을 7자 이하 적어주세요',
                    },
                  })}
                  aria-invalid={errors.nickName ? 'true' : 'false'}
                />
                <FormErrorMessage>{errors.nickName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.introduction}>
                <FormLabel htmlFor='description'>나를 한 마디로 표현해주세요</FormLabel>
                <Input
                  id='description'
                  placeholder='소개를 입력해주세요'
                  type='text'
                  {...register('introduction', {
                    required: '소개를 채워주세요',
                    minLength: {
                      value: 2,
                      message: '소개를 2자 이상로 적어주세요',
                    },
                    maxLength: {
                      value: 30,
                      message: '소개를 30자 이하로 적어주세요',
                    },
                  })}
                />
                <FormErrorMessage>{errors.introduction?.message}</FormErrorMessage>
              </FormControl>

              <Button
                loading={isSubmitting || isSubmitSuccessful}
                disabled={!isDirty || !isValid || isSubmitSuccessful}
                onClick={handleSubmit(onSubmit)}
                style={{
                  padding: '1rem',
                  backgroundColor: 'primary',
                  color: 'white',
                }}>
                {!isDirty || !isValid
                  ? '프로필을 수정해주세요'
                  : isSubmitSuccessful
                  ? '내 프로필 페이지로 이동중...'
                  : '프로필 수정하기'}
              </Button>
            </VStack>
          </form>
        </Flex>
      </Flex>
    )
  );
};

export default MyProfileEditPage;
