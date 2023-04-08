import FoodPartyCreateForm from 'components/FoodParty/Create';
import Head from 'next/head';

const Create = () => {
  return (
    <>
      <Head>
        <title>밥모임 생성</title>
      </Head>
      <FoodPartyCreateForm />;
    </>
  );
};

export default Create;
