import React from 'react';
import { useTimer } from 'react-timer-hook';
import DateTimeDisplay from './DateTimeDisplay';
import { Box, Grid, GridItem, HStack } from '@chakra-ui/react';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('Winner Will Be Announced Soon!!'),
  });

  return (
    <Box>
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </Box>
  );
}

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <HStack p={2} border="1px solid teal" bgColor="white" borderRadius={15}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        </GridItem>
        <GridItem colSpan={1}>
          <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        </GridItem>
        <GridItem colSpan={1}>
          <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        </GridItem>
        <GridItem colSpan={1}>
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </GridItem>
      </Grid>
    </HStack>
  );
};

const Countdown = () => {
    const time = new Date("2022-08-31T23:59+0800");
    console.log("time", time)
  time.setSeconds(time.getSeconds()); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
};

export default Countdown;
