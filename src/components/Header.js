import React from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import CountdownTimer from './CountdownTimer';
import Countdown from './Countdown';

const Header = () => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <Container minH={50}>
      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <Center>
            <Heading fontWeight={2}>Giveaway Lucky Draw</Heading>
          </Center>
        </GridItem>
        <GridItem colSpan={1}>
          <Center>
            <VStack>
              <Heading size="md" color="blue">
                Count Down to Final Draw 31 August 2022
              </Heading>

              <Countdown />
            </VStack>
          </Center>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Header;
