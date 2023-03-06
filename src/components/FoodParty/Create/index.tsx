import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Button from 'components/common/Button';
import moment, { Moment } from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { selectedRestaurantState } from 'stores/Restaurant';
import { getTwoDigitNum } from 'utils/helpers/dateFormat';

import FoodPartyCalendar from './FoodPartyCalendar';
import FoodPartyCategoryItem from './FoodPartyCategory';
import FoodPartyTimePicker from './FoodPartyTimePicker';

type PartyFormType = {
  title: string;
  category: string;
  participants: number;
  partyTime: string;
  description: string;
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

  const onSubmit = (data: PartyFormType) => {
    const promiseDate = `${date.getFullYear()}-${getTwoDigitNum(
      date.getMonth() + 1
    )}-${getTwoDigitNum(date.getDate())}`;
    const promiseTime = `${time.format('hh.mm.ss')}`;
    setValue('partyTime', `${promiseDate}T${promiseTime}`);
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
        <Text fontSize='2xl' fontWeight={600}>
          어떤 밥모임을 만들까요?
        </Text>
        <Form>
          <Input
            type='text'
            {...register('title', {
              required: true,
              minLength: 1,
            })}
            bgColor='transparent'
            placeholder='제목을 입력해주세요!'
            size='lg'
            borderColor='transparent'
            focusBorderColor='transparent'
          />
          {/** Todo: 제목을 입력하면 Accordion이 보이게 변경하려고 함 */}
          <Accordion allowToggle defaultIndex={[0]}>
            {/** 밥모임 카테고리 */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' fontWeight={600} textAlign='left'>
                    카테고리
                  </Box>
                  <Box fontSize='sm' color='gray.500' pr={1.5}>
                    {categoryState}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <FoodPartyCategoryItem onClick={handleClickCategory} />
              </AccordionPanel>
            </AccordionItem>
            {/** 밥모임 인원 */}
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
                  인원
                </Flex>
                <NumberInput
                  w={70}
                  h='100%'
                  mr={3.5}
                  my={0.3}
                  bgColor='transparent'
                  borderColor='transparent'
                  focusBorderColor='transparent'
                  defaultValue={2}
                  min={2}
                  max={8}>
                  <NumberInputField
                    {...register('participants', {
                      required: true,
                      minLength: 1,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </AccordionItem>
            {/** 밥모임 날짜 */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' fontWeight={600} textAlign='left'>
                    날짜
                  </Box>
                  <Box fontSize='sm' color='gray.500' pr={1.5}>
                    {currentDate}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <FoodPartyCalendar date={date} onChange={handleClickDate} />
              </AccordionPanel>
            </AccordionItem>
            {/** 밥모임 시간 */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' fontWeight={600} textAlign='left'>
                    시간
                  </Box>
                  <Box fontSize='sm' color='gray.500' pr={1.5}>
                    {currentTime}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <FoodPartyTimePicker value={time} onChange={handleClickTime} />
              </AccordionPanel>
            </AccordionItem>
            {/** 밥모임 설명  */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' fontWeight={600} textAlign='left'>
                    밥모임 설명
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Textarea
                  {...register('description', {
                    required: false,
                  })}></Textarea>
              </AccordionPanel>
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
