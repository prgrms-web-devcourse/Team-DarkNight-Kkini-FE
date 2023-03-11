import { Flex, Text } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Button from 'components/common/Button';
import { usePostLeaderReview } from 'hooks/query/useFoodParty';
import { usePostMemberReview } from 'hooks/query/useFoodParty';
import Image from 'next/image';
import { useState } from 'react';

import LeaderReviewList from './LeaderReviewList';
import MemberReviewList from './MemberReviewList';

type ReviewBottomDrawerType = {
  isOpen: boolean;
  onClose: () => void;
  selectedUserRole: string;
  selectedUserName: string;
  selectedUserId: number;
  partyId: string;
};

const ReviewBottomDrawer = ({
  isOpen,
  onClose,
  selectedUserRole,
  selectedUserName,
  selectedUserId,
  partyId,
}: ReviewBottomDrawerType) => {
  const [tasteScore, setTasteScore] = useState(0);
  const [mannerScore, setMannerScore] = useState(0);
  const { mutate: mutateLeader, isSuccess: isSuccessMutateLeader } =
    usePostLeaderReview(partyId);
  const { mutate: mutateMember, isSuccess: isSuccessMutateMember } =
    usePostMemberReview(partyId);
  const handleClickReviewButton = () => {
    const leaderBody = {
      leaderId: selectedUserId,
      content: '',
      mannerScore,
      tasteScore,
    };
    const memberBody = {
      revieweeId: selectedUserId,
      content: '',
      mannerScore,
    };
    selectedUserRole === 'LEADER'
      ? mutateLeader({ crewId: partyId, body: leaderBody })
      : mutateMember({ crewId: partyId, body: memberBody });
  };

  if (isSuccessMutateLeader || isSuccessMutateMember) onClose();
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
          {selectedUserRole === 'LEADER' && <LeaderReviewList setScore={setTasteScore} />}
          <MemberReviewList setScore={setMannerScore} />
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
