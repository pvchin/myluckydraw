import React from 'react';
import { Box } from '@chakra-ui/react';
import { useCountdown } from './useCountdown';
import DateTimeDisplay from './DateTimeDisplay';

const ExpiredNotice = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 32,
        border: '1px solid #ebebeb',
        borderRadius: 4,
        margin: 8,
      }}
    >
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <Box p={5}>
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        //className="countdown-link"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 700,
          fontSize: 20,
          lineHeight: 28,
          padding: 8,
          border: '1px solid #ebebeb',
          borderRadius: 4,
          textDecoration: 'none',
          color: '#000',
        }}
      >
        <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </a>
    </Box>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <Box h={10}>
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </Box>
    );
  }
};

export default CountdownTimer;
