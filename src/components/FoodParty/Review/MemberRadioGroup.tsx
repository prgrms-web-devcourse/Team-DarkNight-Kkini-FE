import { Flex, Heading, Text, useRadioGroup } from '@chakra-ui/react';
import Image from 'next/image';
import { foodPartyMemberReviewState } from 'utils/constants/foodParty';

import ReviewItem from './ReviewItem';

type MemberRadioGroupProps = {
  setScore: (value: number) => void;
};

const MemberRadioGroup = ({ setScore }: MemberRadioGroupProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'mannerScore',
    onChange: (value) => setScore(parseInt(value)),
  });
  const group = getRootProps();

  return (
    <>
      <Heading fontSize='md'>매너를 리뷰해주세요!</Heading>
      <Flex {...group}>
        {foodPartyMemberReviewState.map(({ title, icon, score }) => (
          <ReviewItem key={title} {...getRadioProps({ value: score.toString() })}>
            <Flex direction='column' gap='0.25rem'>
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

export default MemberRadioGroup;
