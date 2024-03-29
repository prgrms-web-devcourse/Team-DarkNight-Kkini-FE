import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NavigationButton from 'components/common/Layout/Navigation/NavigationButton';
import { useRouter } from 'next/router';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsMap } from 'react-icons/bs';
import { CiForkAndKnife, CiReceipt } from 'react-icons/ci';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginState } from 'stores/auth';
import { loginDrawerState } from 'stores/drawer';
import { foodPartyCreateDrawerOpenState } from 'stores/drawer';
import { foodPartyCreateDrawerInitState } from 'stores/drawer';
import { NavigationButtonProps } from 'types/navigation';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const Navigation = () => {
  const [foodPartyCreateDrawerOpen, setFoodPartyCreateDrawerOpen] = useRecoilState(
    foodPartyCreateDrawerOpenState
  );
  const setLoginDrawer = useSetRecoilState(loginDrawerState);
  const isLogin = useRecoilValue(isLoginState);
  const [isInit, setIsInit] = useRecoilState(foodPartyCreateDrawerInitState);
  const router = useRouter();

  const checkLoginUser = () => {
    if (!isLogin) {
      setLoginDrawer({ isOpen: true, urlAfterLogin: ROUTING_PATHS.HOME });
    }
    return isLogin;
  };

  const handleClickAroundFoodPartyList = () => {
    router.push(ROUTING_PATHS.HOME);
  };

  const handleClickCreateFoodParty = () => {
    if (checkLoginUser()) {
      isInit && setIsInit(false);
      setFoodPartyCreateDrawerOpen(!foodPartyCreateDrawerOpen);
    }
  };

  const handleClickMyFoodParty = () => {
    if (checkLoginUser()) {
      foodPartyCreateDrawerOpen && setFoodPartyCreateDrawerOpen(false);
      router.push(ROUTING_PATHS.FOOD_PARTY.LIST.MY);
    }
  };

  const handleClickApplication = () => {
    if (checkLoginUser()) {
      router.push(ROUTING_PATHS.APPLICATION);
      foodPartyCreateDrawerOpen && setFoodPartyCreateDrawerOpen(false);
    }
  };

  const NavigationItem: NavigationButtonProps[] = [
    {
      Icon: <MapIcon />,
      label: '주변밥모임',
      onClick: handleClickAroundFoodPartyList,
    },
    {
      Icon: <FoodPartyCreateIcon />,
      label: '밥모임생성',
      onClick: handleClickCreateFoodParty,
    },
    {
      Icon: <MyFoodPartyIcon />,
      label: '내 밥모임',
      onClick: handleClickMyFoodParty,
    },
    {
      Icon: <ApplicationIcon />,
      label: '신청서',
      onClick: handleClickApplication,
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

const FoodPartyCreateIcon = styled(AiOutlinePlusCircle)`
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

const ApplicationIcon = styled(CiReceipt)`
  width: 2rem;
  height: 1.8rem;
`;

const MyFoodPartyIcon = styled(CiForkAndKnife)`
  width: 2rem;
  height: 2.5rem;
`;
