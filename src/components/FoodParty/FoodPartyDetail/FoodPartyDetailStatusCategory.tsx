import Category from 'components/common/Category';
import { FoodPartyStatus } from 'types/foodParty';

const FoodPartyDetailStatusCategory = ({ status }: { status: FoodPartyStatus }) => {
  return <Category foodPartyDetailStatus={status}>{status}</Category>;
};

export default FoodPartyDetailStatusCategory;
