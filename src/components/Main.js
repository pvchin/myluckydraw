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

import FormEntry from './FormEntry';
import Header from './Header';
import Contest from './Contest';

const Main = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Box
        h={{ base: 'auto', md: '100vh' }}
        py={[0, 10, 20]}
        direction={{ base: 'column', md: 'row' }}
      >
        <Grid
          templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
          gap={6}
        >
          <GridItem colSpan={2} py={5}>
            <Header />
          </GridItem>

          <GridItem colSpan={1} py={5}>
            <Contest />
          </GridItem>
          <GridItem colSpan={1} py={5}>
            <FormEntry />
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default Main;
