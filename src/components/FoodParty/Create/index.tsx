import {
  Accordion,
  AccordionItem,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import AccordionBody from 'components/common/Accordion/AccordionBody';
import AccordionHeader from 'components/common/Accordion/AccordionHeader';
import Button from 'components/common/Button';
import { useCreateFoodParty } from 'hooks/query/useFoodParty';
import moment, { Moment } from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { selectedRestaurantState } from 'stores/restaurant';
import { PartyFormType } from 'types/foodParty';
import ROUTING_PATHS from 'utils/constants/routingPaths';
import { getPhotoUrlsString } from 'utils/helpers/foodParty';

import FoodPartyCalendar from './FoodPartyCalendar';
import FoodPartyCapacity from './FoodPartyCapacity';
import FoodPartyCategoryItem from './FoodPartyCategory';
import FoodPartyTimePicker from './FoodPartyTimePicker';

/** 컴포넌트 분리 필요 */
const FoodPartyCreateForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [categoryState, setCategoryState] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [time, setTime] = useState<Moment>(moment().hours(19).minute(0));
  const [currentTime, setCurrentTime] = useState('');

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<PartyFormType>();
  const selectedRestaurant = useRecoilValue(selectedRestaurantState);
  const { mutate } = useCreateFoodParty();
  const handleClickCategory = (value: string) => {
    setValue('category', value);
    setCategoryState(value);
  };

  const handleClickDate = (date: Date) => {
    setDate(date);
    setCurrentDate(moment(date).format('YYYY년 MM월 DD일'));
  };

  const handleClickTime = (time: Moment) => {
    if (!time) {
      setCurrentTime(`시간을 설정해주세요`);
      return;
    }
    setTime(time);
    setCurrentTime(`${time.format('h:mm a')}`);
  };

  const setPartyTime = (date: Date, time: Moment) => {
    const promiseDate = `${moment(date).format('YYYY-MM-DD')}`;
    const promiseTime = `${time.format('HH:mm:ss')}`;
    setValue('promiseTime', `${promiseDate}T${promiseTime}`);
  };

  const onSubmit: SubmitHandler<PartyFormType> = () => {
    setPartyTime(date, time);
    const body = {
      createStoreRequest: {
        ...selectedRestaurant,
        photoUrls: getPhotoUrlsString(selectedRestaurant.photoUrls),
      },
      ...getValues(),
    };
    mutate(body);
  };

  useEffect(() => {
    if (selectedRestaurant.placeName === '') {
      router.push(ROUTING_PATHS.HOME);
      toast({
        title: '가게를 선택하지 않았습니다.',
        description: '밥모임 생성 버튼을 통해 가게를 선택해주세요!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [router, selectedRestaurant, toast]);

  return (
    <Flex align='center' justify='center' backgroundColor='subBackground' h='100%'>
      <Box
        w='90%'
        h='95%'
        bgColor='white'
        borderRadius='8px'
        p='2rem'
        position='relative'>
        <Text fontSize='xl' fontWeight={600}>
          어떤 밥모임을 만들까요?
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired isInvalid={!!errors.name}>
            <Input
              type='text'
              {...register('name', {
                required: true,
                minLength: {
                  value: 2,
                  message: '제목을 2자 이상으로 적어주세요',
                },
                maxLength: {
                  value: 15,
                  message: '제목을 15자 이하로 적어주세요',
                },
              })}
              bgColor='transparent'
              placeholder='제목을 입력해주세요!'
              size='lg'
              borderColor='transparent'
              focusBorderColor='gray.100'
              my='0.25rem'
            />
            <FormErrorMessage mb='0.25rem'>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          {/** Todo: 제목을 입력하면 Accordion이 보이게 변경하려고 함 */}
          <Accordion allowToggle defaultIndex={[0]}>
            <AccordionItem>
              <Flex align='center'>
                <Flex
                  as='span'
                  flex='1'
                  h={35}
                  fontWeight={600}
                  pl='1rem'
                  justify='flex-start'
                  align='center'>
                  가게명
                </Flex>
                <Text color='gray.500' pr='2rem'>
                  {selectedRestaurant.placeName}
                </Text>
              </Flex>
            </AccordionItem>
            {/** 밥모임 카테고리 */}
            <AccordionItem>
              <AccordionHeader>
                <Box as='span' flex='1' fontWeight={600} textAlign='left'>
                  카테고리
                </Box>
                <Box fontSize='sm' color='gray.500' pr={1.5}>
                  {categoryState}
                </Box>
              </AccordionHeader>
              <AccordionBody>
                <FoodPartyCategoryItem onClick={handleClickCategory} />
              </AccordionBody>
            </AccordionItem>
            {/** 밥모임 인원 */}
            <AccordionItem>
              <FoodPartyCapacity<PartyFormType>
                register={register}
                registerRules={{
                  required: true,
                  minLength: 1,
                }}
                registerName={'capacity'}
              />
            </AccordionItem>
            {/** 밥모임 날짜 */}
            <AccordionItem>
              <AccordionHeader>
                <Box as='span' flex='1' fontWeight={600} textAlign='left'>
                  날짜
                </Box>
                <Box fontSize='sm' color='gray.500' pr={1.5}>
                  {currentDate}
                </Box>
              </AccordionHeader>
              <AccordionBody>
                <FoodPartyCalendar date={date} onChange={handleClickDate} />
              </AccordionBody>
            </AccordionItem>
            {/** 밥모임 시간 */}
            <AccordionItem>
              <AccordionHeader>
                <Box as='span' flex='1' fontWeight={600} textAlign='left'>
                  시간
                </Box>
                <Box fontSize='sm' color='gray.500' pr={1.5}>
                  {currentTime}
                </Box>
              </AccordionHeader>
              <AccordionBody>
                <FoodPartyTimePicker value={time} onChange={handleClickTime} />
              </AccordionBody>
            </AccordionItem>
            {/** 밥모임 설명  */}
            <AccordionItem>
              <AccordionHeader>
                <Box as='span' flex='1' fontWeight={600} textAlign='left'>
                  밥모임 설명
                </Box>
              </AccordionHeader>
              <AccordionBody>
                <Textarea
                  {...register('content', {
                    required: false,
                  })}></Textarea>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
          <Button
            type='submit'
            width='100%'
            style={{
              backgroundColor: 'primary',
              color: 'white',
            }}>
            다음
          </Button>
        </Form>
      </Box>
    </Flex>
  );
};

export default FoodPartyCreateForm;

const Form = styled.form`
  overflow: scroll;
`;
