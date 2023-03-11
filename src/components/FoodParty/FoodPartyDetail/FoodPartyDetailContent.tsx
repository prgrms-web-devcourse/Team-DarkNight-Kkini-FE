import { Button, Flex, Text } from '@chakra-ui/react';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineSearch } from 'react-icons/ai';
import { templatePromiseDate, templatePromiseTime } from 'utils/helpers/foodParty';

type FoodPartyDetailContentProps = {
  promiseTime: number[];
  content: string;
  onClick: () => void;
};

const FoodPartyDetailContent = ({
  promiseTime,
  content,
  onClick,
}: FoodPartyDetailContentProps) => {
  const [year, month, day, hour, minute] = promiseTime;

  return (
    <>
      <Flex flexDirection='column' gap='0.5rem'>
        <Flex alignItems='center' gap='0.5rem'>
          <AiOutlineCalendar />
          <Text>{templatePromiseDate(year, month, day)}</Text>
        </Flex>
        <Flex alignItems='center' gap='0.5rem'>
          <AiOutlineClockCircle />
          <Text>{templatePromiseTime(hour, minute)}</Text>
        </Flex>
        <Flex alignItems='center' gap='0.5rem'>
          <AiOutlineSearch />
          <Button onClick={onClick} height='1.5rem'>
            맛집 정보
          </Button>
        </Flex>
      </Flex>
      <Text margin='1rem 0'>{content}</Text>
    </>
  );
};

export default FoodPartyDetailContent;
