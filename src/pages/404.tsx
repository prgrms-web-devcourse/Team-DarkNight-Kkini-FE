import { Box } from '@chakra-ui/react';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <Box width='100%' height='100%' backgroundColor='subBackground'>
      <GoHomeWhenErrorInvoked errorText='존재하지 않는 페이지에요..!'>
        <Image src='/images/sausage.gif' alt='소시지' width={400} height={300} />
      </GoHomeWhenErrorInvoked>
    </Box>
  );
};
export default Custom404;
