import Button from 'components/common/Button';

type MyPageButtonProps = {
  buttonText: string;
  onClick: () => void;
};

const UserPageButton = ({ buttonText, onClick }: MyPageButtonProps) => {
  return (
    <Button
      onClick={onClick}
      width='100%'
      style={{
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: 'primary',
        color: 'primary',
        marginTop: '0.5rem',
      }}>
      {buttonText}
    </Button>
  );
};

export default UserPageButton;
