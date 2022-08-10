import React from 'react';
import { Box, Center, Grid, GridItem,Heading,HStack, VStack } from '@chakra-ui/react';
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
    <HStack p={2} border="1px solid teal" bgColor="teal.100" borderRadius={15}>
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
