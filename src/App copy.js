import React from 'react';
import {
  Box,
  ChakraProvider,
  Container,
  Center,
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
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { theme } from './theme';
import img1 from './assets/Giveaway.png';
import FormEntry from './components/FormEntry';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid
        h="200px"
        //templateRows={{ base: 'repeat(4,1ft)', md: 'repeat(4,1ft)' }}
        //templateColumns="repeat(6, 1fr)"
        templateColumns={{ base: 'repeat(6,1ft)', md: 'repeat(1,1ft)' }}
        gap={4}
      >
        <GridItem colSpan={6} bg="teal.100">
          <Center>
            <Heading>Lucky Draw</Heading>
          </Center>
        </GridItem>
        <GridItem colSpan={3} bg="olive.100">
          <Center>
            <Image src={img1} alt="album" />
          </Center>
        </GridItem>
        <GridItem colSpan={3} bg="olive.100">
          <Center>
            <FormEntry />
          </Center>
        </GridItem>
        <GridItem colSpan={6} bg="tomato"></GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
