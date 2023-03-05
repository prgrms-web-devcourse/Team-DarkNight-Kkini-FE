import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const DUMMY_PARTY = {
  name: '라멘 뇸뇸뇸, 나가면 지상렬',
  capacity: 5,
  promiseTime: [2023, 3, 3, 13, 30, 0, 893316700],
  categories: ['QUIET', 'MANNERS MAKETH MAN'],
  members: [
    {
      userId: 1,
      userName: 'hello',
      avatarUrl: 'amklgaerg',
      isReady: true,
    },
    {
      userId: 2,
      userName: 'world',
      avatarUrl: 'sdbfml',
      isReady: true,
    },
    {
      userId: 3,
      userName: 'developer',
      avatarUrl: 'gmklbia',
      isReady: false,
    },
  ],
  comments: [
    {
      commentId: 19273,
      userId: 1,
      userName: 'hello',
      avatarUrl: 'amklgaerg',
      createdAt: [2023, 3, 3, 12, 10, 0, 893316700],
      updatedAt: [2023, 3, 3, 12, 10, 0, 893316700],
      content: '안녕하세요',
    },
    {
      commentId: 19274,
      userId: 2,
      userName: 'world',
      avatarUrl: 'sdbfml',
      createdAt: [2023, 3, 3, 12, 12, 0, 893316700],
      updatedAt: [2023, 3, 3, 12, 12, 0, 893316700],
      content: '네, 하이요',
    },
    {
      commentId: 19275,
      userId: 1,
      userName: 'hello',
      avatarUrl: 'amklgaerg',
      createdAt: [2023, 3, 3, 12, 15, 0, 893316700],
      updatedAt: [2023, 3, 3, 12, 17, 0, 893316700],
      content: '반갑습니다!',
    },
  ],
};

const FoodPartyDetail = () => {
  const router = useRouter();
  const partyId = router.query.partyId;

  // To Do: 404 처리 by 승준
  // if (!partyId) router.push('')

  return <Box padding='1rem'>{partyId}</Box>;
};

export default FoodPartyDetail;

// To Do: 서버 사이드 렌더링, getServerSideProps by 승준
