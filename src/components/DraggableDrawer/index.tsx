import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { foodPartyCreateDrawerOpenState } from 'stores/drawer';

import { useDrawer } from '../../hooks/useDrawer';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import DrawerHeader from './DrawerHeader';

type DraggableDrawerProps = {
  children: ReactNode;
};

const DraggableDrawer = ({ children }: DraggableDrawerProps) => {
  const { drawer, content } = useDrawer();
  const { windowHeight } = useWindowHeight();
  const foodPartyCreateDrawerOpen = useRecoilValue(foodPartyCreateDrawerOpenState);

  return foodPartyCreateDrawerOpen ? (
    <Box
      ref={drawer}
      css={css`
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 11;
        display: flex;
        flex-direction: column;
        width: min(100vw, 560px);
        height: ${windowHeight - 120}px;
        background-color: #fff;
        border-top: 0px 0px 10px rgba(0, 0, 0, 0.6);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        transform: translateY(120px);
        animation: 0.5s ease-in-out Open;
        @keyframes Open {
          from {
            transform: translateY(${windowHeight - 120}px);
          }
          to {
            transform: translateY(120px);
          }
        }
      `}>
      <DrawerHeader />
      <Box
        ref={content}
        css={css`
          height: 100%;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        `}>
        {children}
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default DraggableDrawer;
