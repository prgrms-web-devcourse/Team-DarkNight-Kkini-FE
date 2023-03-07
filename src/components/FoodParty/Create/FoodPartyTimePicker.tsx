import 'rc-time-picker/assets/index.css';

import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Moment } from 'moment';
import TimePicker from 'rc-time-picker';

type FoodPartyTimePickerProps = {
  value: Moment;
  onChange: (time: Moment) => void;
};

const FoodPartyTimePicker = ({ value, onChange }: FoodPartyTimePickerProps) => {
  const format = 'h:mm a';

  return (
    <Flex>
      <CustomTimePicker
        showSecond={false}
        defaultValue={value}
        className='xxx'
        onChange={onChange}
        format={format}
        inputReadOnly
      />
    </Flex>
  );
};

export default FoodPartyTimePicker;

const CustomTimePicker = styled(TimePicker)`
  flex: 1;
`;
