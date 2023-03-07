import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { RegisterType } from 'types/form';

const FoodPartyCapacity = <FormValues extends object>({
  register,
  registerName,
  registerRules,
}: RegisterType<FormValues>) => {
  return (
    <Flex align='center'>
      <Flex
        as='span'
        flex='1'
        h={35}
        fontWeight={600}
        pl='1rem'
        justify='flex-start'
        align='center'>
        인원
      </Flex>
      <NumberInput
        w={70}
        h='100%'
        mr={3.5}
        my={0.3}
        bgColor='transparent'
        borderColor='transparent'
        focusBorderColor='transparent'
        defaultValue={2}
        min={2}
        max={8}>
        <NumberInputField {...register(registerName, registerRules)} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
};

export default FoodPartyCapacity;
