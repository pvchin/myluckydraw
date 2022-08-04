import React from 'react'
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
import img1 from '../assets/Giveaway.png';

const Contest = () => {
  return (
    <Flex>
      <Stack spacing={5} mx="auto" w={{ base: 'auto', md: 'xl' }} py={1} px={1}>
        <Center>
          <Image src={img1} alt="album" />
        </Center>
      </Stack>
    </Flex>
  );
}

export default Contest