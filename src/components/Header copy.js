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
import { MovingComponent } from 'react-moving-text';
import CountdownTimer from './CountdownTimer';
import Countdown from './Countdown';
import bannerimg from '../assets/banner.png';
import img1 from '../assets/giveawaytext.png';

const Header = () => {
  return (
    <Flex minH={50}>
      <Grid templateColumns="repeat(12, 1fr)" gap={0}>
        <GridItem colSpan={12}>
          <Center>
            <Image src={bannerimg} alt="banner" />
          </Center>
        </GridItem>
        {/* <GridItem colSpan={1}>
          <Center>
            <VStack>
              <Heading size="md" color="green.500">
                Count Down to Final Draw 31st August 2022
              </Heading>

              <Countdown />
            </VStack>
          </Center>
        </GridItem> */}
      </Grid>
    </Flex>
  );
};

export default Header;
