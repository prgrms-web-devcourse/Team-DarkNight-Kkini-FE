import ApplicationItem from 'components/FoodParty/Application/ApplicationItem';
import { useSentApplication } from 'hooks/query/useApplication';

const SentApplication = () => {
  const { data } = useSentApplication();

  return (
    <div>
      {data?.map((application) => (
        <ApplicationItem key={application.id} application={application} />
      ))}
    </div>
  );
};

export default SentApplication;
