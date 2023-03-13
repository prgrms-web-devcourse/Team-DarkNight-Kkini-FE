import Button from 'components/common/Button';

type UUserProfileButtonProps = {
  buttonText: string;
  onClick: () => void;
};

const UUserProfileButton = ({ buttonText, onClick }: UUserProfileButtonProps) => {
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
        padding: '0.75rem',
      }}>
      {buttonText}
    </Button>
  );
};

export default UUserProfileButton;
