import { Flex, Heading, Text, useRadioGroup } from '@chakra-ui/react';
import Image from 'next/image';
import { foodPartyLeaderReviewState } from 'utils/constants/foodParty';

import ReviewItem from './ReviewItem';

type LeaderRadioGroupProps = {
  setScore: (value: number) => void;
};

const LeaderRadioGroup = ({ setScore }: LeaderRadioGroupProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'leaderTasteScore',
    onChange: (value) => setScore(parseInt(value)),
  });

  const group = getRootProps();

  return (
    <>
      <Heading fontSize='md'>방장을 리뷰해주세요!</Heading>
      <Flex {...group}>
        {foodPartyLeaderReviewState.map(({ title, icon, score }) => (
          <ReviewItem key={icon} {...getRadioProps({ value: score.toString() })}>
            <Flex direction='column'>
              <Image src={icon} alt={title} width={50} height={50} />
              <Text textAlign='center' fontSize='0.5rem'>
                {title}
              </Text>
            </Flex>
          </ReviewItem>
        ))}
      </Flex>
    </>
  );
};

export default LeaderRadioGroup;
