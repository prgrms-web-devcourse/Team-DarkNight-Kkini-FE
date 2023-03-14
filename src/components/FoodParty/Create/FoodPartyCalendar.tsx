import 'react-calendar/dist/Calendar.css';

import styled from '@emotion/styled';
import moment from 'moment';
import Calendar from 'react-calendar';

type FoodPartyCalendarProps = {
  date: Date;
  onChange: (date: Date) => void;
};

const disablePastDates = ({ date }: { date: Date }) => {
  const newDate = new Date();
  return date < new Date(newDate.setDate(newDate.getDate() - 1));
};

const FoodPartyCalendar = ({ date, onChange }: FoodPartyCalendarProps) => {
  return (
    <CustomCalendar
      onChange={onChange}
      value={date}
      tileDisabled={disablePastDates}
      formatDay={(locale, date: Date) => moment(date).format('DD')}
    />
  );
};

const CustomCalendar = styled(Calendar)`
  width: 100%;
  color: #222;
  font-size: 0.75rem;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);

  .react-calendar__navigation button {
    min-width: 44px;
    margin-top: 8px;
    color: #ff7525;
    font-size: 0.75rem;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    color: #ff7525;
    background: #f8f8fa;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    color: #ff7525;
    font-weight: bold;
    background: #6f48eb33;
    border-radius: 6px;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    color: #ff7525;
    font-weight: bold;
    background: #6f48eb33;
    border-radius: 6px;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #ff7525;
  }
  .react-calendar__tile--active {
    color: white;
    font-weight: bold;
    background: #ff7525;
    border-radius: 6px;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    color: white;
    background: #ff7525;
  }
`;

export default FoodPartyCalendar;
