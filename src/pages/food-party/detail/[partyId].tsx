import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const FoodPartyDetail = () => {
  const router = useRouter();
  const partyId = router.query.partyId;

  // To Do: 404 처리 by 승준
  // if (!partyId) router.push('')

  return <Box padding='1rem'>{partyId}</Box>;
};

export default FoodPartyDetail;

// To Do: 서버 사이드 렌더링, getServerSideProps by 승준
