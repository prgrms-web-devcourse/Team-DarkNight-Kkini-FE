import { Flex, Text } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Button from 'components/common/Button';
import Image from 'next/image';
import { useState } from 'react';

import LeaderRadioGroup from './LeaderRadioGroup';
import MemberRadioGroup from './MemberRadioGroup';
type ReviewBottomDrawerType = {
  isOpen: boolean;
  onClose: () => void;
  /** 유저 정보를 넘겨준다.  */
  selectedUserRole: string;
  selectedUserName: string;
};

const ReviewBottomDrawer = ({
  isOpen,
  onClose,
  selectedUserRole,
  selectedUserName,
}: ReviewBottomDrawerType) => {
  /**ToDo. tasteScore, mannerScore body에 담아 Post 요청하기 */
  const [tasteScore, setTasteScore] = useState(0);
  const [mannerScore, setMannerScore] = useState(0);
  const handleClickReviewButton = () => {};

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Flex justify='space-between'>
          <Text fontSize='1.2rem'>{selectedUserName}의 리뷰를 입력해주세요!</Text>
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
        <Flex direction='column' gap='0.5rem'>
          {selectedUserRole === 'LEADER' && <LeaderRadioGroup setScore={setTasteScore} />}
          <MemberRadioGroup setScore={setMannerScore} />
          <Button
            onClick={handleClickReviewButton}
            style={{
              background: 'primary',
              marginTop: '1rem',
              color: 'white',
              fontWeight: 700,
              boxShadow: '0px 0px 5px #888',
            }}>
            리뷰 작성하기
          </Button>
        </Flex>
      }></BottomDrawer>
  );
};

export default ReviewBottomDrawer;
