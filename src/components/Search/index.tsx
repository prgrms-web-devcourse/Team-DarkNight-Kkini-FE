import { Button, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import useSearchRestaurant from 'hooks/useSearchRestaurant';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

const SearchRestaurant = () => {
  const [value, setValue] = useState('');
  const { searchByKeyword } = useSearchRestaurant();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchByKeyword(value);
  };

  return (
    <Flex border='1px solid black' borderRadius='8px' mx='1rem' mt='0.5rem'>
      <Button disabled bgColor='transparent' px='0.2rem' width='20px'>
        <BsSearch />
      </Button>
      <Form onSubmit={handleSubmit}>
        <Input type='text' value={value} onChange={handleChange} />
      </Form>
      <Button onClick={handleReset} bgColor='transparent' px='0.2rem'>
        <BiX />
      </Button>
    </Flex>
  );
};

export default SearchRestaurant;

const Form = styled.form`
  flex: 1;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 5px;
`;
