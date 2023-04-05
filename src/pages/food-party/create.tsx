import FoodPartyCreateForm from 'components/FoodParty/Create';
import Head from 'next/head';

const Create = () => {
  return (
    <>
      <Head>
        <title>Create Food Party</title>
      </Head>
      <FoodPartyCreateForm />;
    </>
  );
};

export default Create;
