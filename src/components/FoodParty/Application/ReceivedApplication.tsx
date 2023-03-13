import ApplicationItem from 'components/FoodParty/Application/ApplicationItem';
import {
  useChangeApplicationStatus,
  useReceivedApplication,
} from 'hooks/query/useApplication';
import { ApplicationStatusChangePayload } from 'types/application';
import { UserProfile } from 'types/auth';

const ReceivedApplication = ({ id }: Pick<UserProfile, 'id'>) => {
  const { data } = useReceivedApplication(id);
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
