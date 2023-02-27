import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { isDrawerOpened } from '../stores/drawer';
import { useWindowHeight } from './useWindowHeight';

type DrawerMatrics = {
  touchStart: {
    drawerY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'up' | 'down';
  };
  isContentAreaTouched: boolean;
};

export function useDrawer() {
  const drawer = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const MIN_Y = 120; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
  const { MAX_Y } = useWindowHeight(); // 바텀시트가 최소로 내려갔을 때의 y 값
  const [isOpened, setIsOpened] = useRecoilState(isDrawerOpened);

  const metrics = useRef<DrawerMatrics>({
    touchStart: {
      drawerY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    const drawerRef = drawer.current;

    if (!drawerRef) return;

    const canUserMoveDrawer = () => {
      const { isContentAreaTouched } = metrics.current;

      // drawer에서 컨텐츠 영역이 아닌 부분 (Header) 터치하면 항상 drawer 움직이기
      if (!isContentAreaTouched) {
        return true;
      }

      return false;
    };

    // 터치 시작 시, drawer현재 위치 및 터치 포인트 Y 기억
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      touchStart.drawerY = drawerRef.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveDrawer()) {
        e.preventDefault();
        // 터치 시작점에서부터 현재 터치 포인트까지 변화된 값
        const touchOffsetY = currentTouch.clientY - touchStart.touchY;
        let nextDrawerY = touchStart.drawerY + touchOffsetY;

        if (nextDrawerY <= MIN_Y) {
          nextDrawerY = MIN_Y;
        }

        if (nextDrawerY >= MAX_Y) {
          nextDrawerY = MAX_Y;
        }

        drawerRef.style.setProperty('transform', `translateY(${nextDrawerY}px)`);
      } else {
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = 'auto';

      const { touchMove } = metrics.current;

      const currentDrawerY = drawerRef.getBoundingClientRect().y;

      if (currentDrawerY >= MAX_Y - 4) {
        if (touchMove.movingDirection === 'down') {
          drawerRef.style.setProperty('transform', `translateY(670px)`);
          setIsOpened(false);
          drawerRef.style.setProperty('display', 'none');
        }
      }

      if (currentDrawerY <= MIN_Y) {
        if (touchMove.movingDirection === 'up') {
          drawerRef.style.setProperty('transform', `translateY(100)`);
        }
      }
      // 초기화
      metrics.current = {
        touchStart: {
          drawerY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentAreaTouched: false,
      };
    };

    drawerRef.addEventListener('touchstart', handleTouchStart);
    drawerRef.addEventListener('touchmove', handleTouchMove);
    drawerRef.addEventListener('touchend', handleTouchEnd);

    return () => {
      drawerRef.removeEventListener('touchstart', handleTouchStart);
      drawerRef.removeEventListener('touchmove', handleTouchMove);
      drawerRef.removeEventListener('touchend', handleTouchEnd);
    };
  }, [MAX_Y, setIsOpened, isOpened]);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };
    const contentRef = content.current;
    if (!contentRef) return;

    contentRef.addEventListener('touchstart', handleTouchStart);

    return () => contentRef.removeEventListener('touchstart', handleTouchStart);
  }, [isOpened]);

  return { drawer, content };
}
