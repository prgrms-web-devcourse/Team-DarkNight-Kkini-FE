import Category from 'components/common/Category';
import { FoodPartyStatus } from 'types/foodParty';

const FOOD_PARTY_DETAIL_STATUS_COLORS: {
  [key: string]: string;
  '모집 중': string;
  '모집 종료': string;
  '식사 완료': string;
} = {
  '모집 중': 'lightgreen',
  '모집 종료': 'orange',
  '식사 완료': 'lightgray',
};

const FoodPartyDetailStatusCategory = ({ status }: { status: FoodPartyStatus }) => {
  return (
    <Category backgroundColor={FOOD_PARTY_DETAIL_STATUS_COLORS[status]}>
      {status}
    </Category>
  );
};

export default FoodPartyDetailStatusCategory;
