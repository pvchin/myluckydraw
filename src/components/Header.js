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
          <Image src={bannerimg} alt="banner" />
          <Center>
            <Box position="absolute" top="150" left="90">
              {/* <MovingComponent
                type="flash"
                duration="1000ms"
                delay="0s"
                direction="normal"
                timing="ease"
                iteration="5"
                fillMode="none"
              >
                <Image src={img1} w={200} />
              </MovingComponent> */}
            </Box>
            <Box position="absolute" top="330" left="710">
              {/* <MovingComponent
                type="fadeInFromLeft"
                duration="1000ms"
                delay="0s"
                direction="normal"
                timing="ease"
                iteration="5"
                fillMode="none"
              >
                <Heading color="black" fontFamily="serif" size="lg">
                  One Winner will be announced on 1/1/2023
                </Heading>
              </MovingComponent> */}
            </Box>
            {/* <MovingComponent
              type="flash"
              duration="1000ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="5"
              fillMode="none"
            ></MovingComponent> */}
            {/* <Heading fontWeight={2}>Giveaway Lucky Draw</Heading> */}
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
