import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Stack,
  HStack,
  VStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import img1 from '../assets/jhope.jpeg';

const Contest = () => {
  return (
    <Flex>
      <Stack
        spacing={5}
        mx="auto"
        w={{ base: 'sm', md: 'xl' }}
        py={1}
        px={{ base: '0', md: '1' }}
      >
        <Center>
          <Image src={img1} alt="album" h="53vh" />
        </Center>
      </Stack>
    </Flex>
  );
};

export default Contest;
