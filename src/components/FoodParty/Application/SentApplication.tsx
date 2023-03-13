import ApplicationItem from 'components/FoodParty/Application/ApplicationItem';
import { useSentApplication } from 'hooks/query/useApplication';
import { UserProfile } from 'types/auth';

const SentApplication = ({ id }: Pick<UserProfile, 'id'>) => {
  const { data } = useSentApplication(id);

  return (
    <div>
      {data?.map((application) => (
        <ApplicationItem key={application.id} application={application} />
      ))}
    </div>
  );
};

export default SentApplication;
