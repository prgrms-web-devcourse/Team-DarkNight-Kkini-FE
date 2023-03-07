import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NavigationButton from 'components/common/Layout/Navigation/NavigationButton';
import { useRouter } from 'next/router';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsMap } from 'react-icons/bs';
import { CgCommunity } from 'react-icons/cg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginState } from 'stores/auth';
import { isDrawerOpenedState } from 'stores/drawer';
import { LoginModal } from 'types/modal';
import { NavigationButtonProps } from 'types/navigation';

const Navigation = ({ onOpen }: LoginModal) => {
  const setIsDrawerOpened = useSetRecoilState(isDrawerOpenedState);
  const isLogin = useRecoilValue(isLoginState);
  const router = useRouter();

  const checkLoginUser = () => {
    if (!isLogin) {
      onOpen();
    }
    return isLogin;
  };

  const handleClickCommunity = () => {
    checkLoginUser() && setIsDrawerOpened(true);
  };

  const handleClickMyFoodParty = () => {
    if (!checkLoginUser()) {
      return;
    }

    router.push('/food-party/list/my');
  };

  const NavigationItem: NavigationButtonProps[] = [
    {
      Icon: <MapIcon />,
      label: '주변밥모임',
    },
    {
      Icon: <PlusIcon />,
      label: '밥모임생성',
      onClick: handleClickCommunity,
    },
    {
      Icon: <CommunityIcon />,
      label: '내 밥모임',
      onClick: handleClickMyFoodParty,
    },
  ];

  return (
    <Flex
      as='nav'
      h='4rem'
      justify='space-around'
      align='center'
      px='10'
      py='1'
      backgroundColor='#ffffff'
      zIndex={100}>
      {NavigationItem.map((item) => (
        <NavigationButton {...item} key={item.label} />
      ))}
    </Flex>
  );
};

export default Navigation;

const PlusIcon = styled(AiOutlinePlusCircle)`
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 0.1rem;
`;

const MapIcon = styled(BsMap)`
  width: 1.6rem;
  height: 1.6rem;
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
`;

const CommunityIcon = styled(CgCommunity)`
  width: 2.5rem;
  height: 2.5rem;
`;
