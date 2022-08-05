import React from 'react';
import {
  Box,
  ChakraProvider,
  Container,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Link,
  VStack,
  Code,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { theme } from '../theme';
import img1 from '../assets/Giveaway.png';
import FormEntry from './FormEntry';
import Header from './Header';
import Contest
    from './Contest';
const Main = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Header />
      <Flex
        h={{ base: 'auto', md: '100vh' }}
        py={[0, 10, 20]}
        direction={{ base: 'column', md: 'row' }}
      >
        <VStack
          w="full"
          h="full"
          p={{ base: 1, md: 10 }}
          spacing={10}
          alignItems="flex-start"
        >
          <Center>
            <Contest />
          </Center>
        </VStack>
        <VStack
          w="full"
          h="full"
          p={{ base: 1, md: 10 }}
          spacing={10}
          alignItems="flex-start"
        >
          <Center>
            <FormEntry />
          </Center>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Main;
