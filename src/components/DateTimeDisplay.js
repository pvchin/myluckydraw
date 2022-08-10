import React from 'react';
import { Box, Center, Heading, VStack } from '@chakra-ui/react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <Box>
      <Center>
        <VStack>
          <Heading size="md">{value}</Heading>
          <Heading size="md">{type}</Heading>
        </VStack>
      </Center>
    </Box>
  );
};

export default DateTimeDisplay;
