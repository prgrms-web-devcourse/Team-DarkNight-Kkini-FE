import ApplicationItem from 'components/FoodParty/Application/ApplicationItem';
import {
  useChangeApplicationStatus,
  useReceivedApplication,
} from 'hooks/query/useApplication';
import { ApplicationStatusChangePayload } from 'types/application';

const ReceivedApplication = () => {
  const { data } = useReceivedApplication();
  const { mutate } = useChangeApplicationStatus();
  const handleChangeApplicationStatus = ({
    applicationId,
    status,
    closeApplicationDrawer,
  }: ApplicationStatusChangePayload) => {
    mutate({ applicationId, status, closeApplicationDrawer });
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
