import { BadgeProps } from '@chakra-ui/react';
import Category from 'components/common/Category';
import { ApplicationStatus } from 'services/application';
import { FoodPartyStatus } from 'types/foodParty';

type StatusKey = FoodPartyStatus | ApplicationStatus;

const STATUS_COLORS: Record<StatusKey, string> = {
  미신청: 'green',
  '모집 중': 'orange',
  '모집 종료': 'pink',
  '식사 완료': 'purple',
  '대기 중': 'orange',
  거절: 'pink',
  승인: 'green',
};

const StatusBadge = ({ status, style }: { status: StatusKey; style?: BadgeProps }) => {
  return (
    <Category
      style={{
        colorScheme: STATUS_COLORS[status],
        padding: '2px 5px',
        ...style,
      }}>
      {status}
    </Category>
  );
};

export default StatusBadge;
