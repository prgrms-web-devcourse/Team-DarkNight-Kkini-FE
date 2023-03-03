import { useRouter } from 'next/router';

const FoodPartyDetail = () => {
  const router = useRouter();

  console.log(router.query);

  return <div>{}</div>;
};

export default FoodPartyDetail;

// To Do: 서버 사이드 렌더링, getServerSideProps by 승준
