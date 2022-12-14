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
      <Center>
        <Image src={bannerimg} alt="banner" />
      </Center>
    </Flex>
  );
};

export default Header;
