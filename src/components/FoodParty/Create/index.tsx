import {
  Accordion,
  AccordionItem,
  Box,
  Flex,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import AccordionBody from 'components/common/Accordion/AccordionBody';
import AccordionHeader from 'components/common/Accordion/AccordionHeader';
import Button from 'components/common/Button';
import moment, { Moment } from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { selectedRestaurantState } from 'stores/Restaurant';
import { getTwoDigitNum } from 'utils/helpers/dateFormat';

import FoodPartyCalendar from './FoodPartyCalendar';
import FoodPartyCapacity from './FoodPartyCapacity';
import FoodPartyCategoryItem from './FoodPartyCategory';
import FoodPartyTimePicker from './FoodPartyTimePicker';

type PartyFormType = {
  name: string;
  category: string;
  capacity: number;
  promiseTime: string;
  content: string;
};

/** 컴포넌트 분리 필요 */
const FoodPartyCreateForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [categoryState, setCategoryState] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [time, setTime] = useState<Moment>(moment().hours(19).minute(0));
  const [currentTime, setCurrentTime] = useState('');

  const { register, setValue, getValues, handleSubmit } = useForm<PartyFormType>();
  const selectedRestaurant = useRecoilValue(selectedRestaurantState);

  const handleClickCategory = (value: string) => {
    setValue('category', value);
    setCategoryState(value);
  };

  const handleClickDate = (date: Date) => {
    setDate(date);
    setCurrentDate(
      `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    );
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
    const promiseDate = `${date.getFullYear()}-${getTwoDigitNum(
      date.getMonth() + 1
    )}-${getTwoDigitNum(date.getDate())}`;
    const promiseTime = `${time.format('hh.mm.ss')}`;
    setValue('promiseTime', `${promiseDate}T${promiseTime}`);
  };

  const onSubmit = () => {
    setPartyTime(date, time);
    const body = {
      restaurant: { ...selectedRestaurant },
      ...getValues(),
    };
  };

  useEffect(() => {
    if (selectedRestaurant.placeName === '') {
      router.push('/');
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
      <Box w='90%' h='95%' bgColor='white' borderRadius='8px' p='2rem'>
        <Text fontSize='xl' fontWeight={600}>
          어떤 밥모임을 만들까요?
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            {...register('name', {
              required: true,
              minLength: 1,
            })}
            bgColor='transparent'
            placeholder='제목을 입력해주세요!'
            size='lg'
            borderColor='transparent'
            focusBorderColor='gray.100'
            my='1rem'
          />
          {/** Todo: 제목을 입력하면 Accordion이 보이게 변경하려고 함 */}
          <Accordion allowToggle defaultIndex={[0]}>
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
