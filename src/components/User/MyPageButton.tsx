import Button from 'components/common/Button';

const MyPageButton = ({ buttonText }: { buttonText: string }) => {
  return (
    <Button
      onClick={console.log}
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

export default MyPageButton;
