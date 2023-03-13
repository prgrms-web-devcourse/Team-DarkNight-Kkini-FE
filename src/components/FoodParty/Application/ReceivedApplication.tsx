import ApplicationItem from 'components/FoodParty/Application/ApplicationItem';
import {
  useChangeApplicationStatus,
  useReceivedApplication,
} from 'hooks/query/useApplication';

const ReceivedApplication = () => {
  const { data } = useReceivedApplication();
  const { mutate } = useChangeApplicationStatus();
  const handleChangeApplicationStatus = (applicationId: number, status: boolean) => {
    mutate({ applicationId, status: status ? '승인' : '거절' });
  };

  return (
    <div>
      {data?.map((application) => (
        <ApplicationItem
          key={application.id}
          application={application}
          onClick={handleChangeApplicationStatus}
        />
      ))}
    </div>
  );
};

export default ReceivedApplication;
