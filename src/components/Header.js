import React from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  HStack,
  VStack,
} from '@chakra-ui/react';
import CountdownTimer from './CountdownTimer';
import Countdown from './Countdown';
import bannerimg from '../assets/banner3.png';

const Header = () => {


  return (
    <Container minH={50}>
      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <Center>
            <Image src={bannerimg} alt="banner" />
            {/* <Heading fontWeight={2}>Giveaway Lucky Draw</Heading> */}
          </Center>
        </GridItem>
        <GridItem colSpan={1}>
          <Center>
            <VStack>
              <Heading size="md" color="green.500">
                Count Down to Final Draw 31st August 2022
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
