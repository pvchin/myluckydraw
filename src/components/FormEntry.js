import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
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
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEntryform } from '../react-query/entryform/useEntryform';
import { useAddEntryform } from '../react-query/entryform/useCreateEntryform';
import { useEntryformAttachments } from '../react-query/entryformattachments/useEntryformAttachments';
import { useAddEntryformAttachment } from '../react-query/entryformattachments/useAddEntryformAttachment';
import { useDocument } from '../react-query/document/useDocument';
import { useUpdateDocument } from '../react-query/document/useUpdateDocument';
import ImageUpload from '../helpers/ImageUpload';

const UPLOADURL = 'https://api.cloudinary.com/v1_1/dlmzwvakr/image/upload';
const DOWNLOADURL = 'https://res.cloudinary.com/v1_1/dlmzwvakr/image/upload';
const UPLOADPRESET = 'mitaluckydraw';

const initial_values = {
  name: '',
  icno: '',
  igid: '',
  email: '',
  mobile: '',
  receiptno: '',
  amount: '',
};


const FormEntry = () => {
  const field_width = '40';
  const font_size = useBreakpointValue({ base: 'sm', md: 'md'})
  const [state, setState] = useState(initial_values);
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState({});
  const [drawno, setDrawNo] = useState([]);
  const { entryform } = useEntryform();
  const addEntryform = useAddEntryform();
  const { entryformattachments } = useEntryformAttachments();
  const addEntryformAttachment = useAddEntryformAttachment();
  const { document } = useDocument();
  const updateDocument = useUpdateDocument();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: state });

  const onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOADPRESET);
      axios({
        url: UPLOADURL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: formData,
      })
        .then(res => {
          //console.log("res", res.data);
          // Object.assign(file, {
          //   preview: res.data.url,
          // });
          setFiles(
            prev =>
              (prev = [
                ...files,
                ...[
                  {
                    name: res.data.original_filename,
                    preview: res.data.secure_url,
                  },
                ],
              ])
          );
        })
        .catch(err => {
          setNewFile({});
          console.log(err);
        });
      // Object.assign(file, {
      //   preview: URL.createObjectURL(file),
      // });
    });

    //const allfiles = [...files, ...acceptedFiles];
    //setFiles(allfiles);
  };

  const saveAttachment = no => {
    files.forEach(rec => {
      const newRec = {
        drawno: no,
        name: rec.name,
        url: rec.preview,
        type: rec.preview.split(',').pop(),
      };
      addEntryformAttachment(newRec);
    });
  };

  const onSubmit = data => {
    let newNo = 0;
    let newDocNo = '';
    let newArray = [];
    let noCopy = Math.floor(data.amount / 5);
    console.log('draw', noCopy);
    for (let i = 1; i <= noCopy; i++) {
      newNo = document[0].entryformno + i;
      newDocNo = document[0].abbre + newNo;
      const { ...fields } = data;
      addEntryform({ ...fields, drawno: newDocNo });
      saveAttachment(newDocNo);
      //save drawno
      newArray = [
        ...newArray,
        ...[
          {
            no: newDocNo,
          },
        ],
      ];
    }

    //update array
    console.log('newarray', newArray);
    setDrawNo(prev => (prev = [...newArray]));

    updateDocument({
      id: document[0].id,
      entryformno: newNo,
    });

    //initial form values
    setValue('name', '');
    setValue('icno', '');
    setValue('mobile', '');
    setValue('email', '');
    setValue('igid', '');
    setValue('receiptno', '');
    setValue('amount', '');
    setFiles([]);

    console.log('drawno', drawno);

    //open dialog
    handleOpen();
  };

  const handleOpen = () => {
    onOpen();
  };

  return (
    <Flex minH="70vh">
      <Center>
        <Stack
          spacing={8}
          mx="auto"
          w={{ base: 'auto', md: 'xl' }}
          py={{ base: 0, md: 1 }}
          px={{ base: 0, md: 1 }}
        >
          <Box p={5} rounded="lg" bg="white" boxShadow="lg">
            <Stack align="center" pb={2}>
              <Heading size={{ base: 'sm', md: 'md' }}>
                Lucky Draw Entry Form
              </Heading>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack alignItems="flex-start">
                <FormControl>
                  <Controller
                    control={control}
                    name="name"
                    //defaultValue={email}

                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            fontSize={font_size}
                            children="Name"
                            minWidth={{ base: 'auto', md: field_width }}
                          />

                          <Input
                            p={1}
                            size={{ base: 'sm', md: 'md' }}
                            name="name"
                            value={value}
                            onChange={onChange}
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="name"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="icno"
                    //defaultValue={name}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="IC No"
                            fontSize={{ base: 'sm', md: 'md' }}
                            minWidth={{ base: 'auto', md: field_width }}
                          />
                          <Input
                            name="icno"
                            p={1}
                            size={{ base: 'sm', md: 'md' }}
                            value={value}
                            onChange={onChange}
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="IC No"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="mobile"
                    //defaultValue={phone}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Mobile No"
                            fontSize={{ base: 'sm', md: 'md' }}
                            minWidth={{ base: 'auto', md: field_width }}
                          />
                          <Input
                            name="mobile"
                            p={1}
                            size={{ base: 'sm', md: 'md' }}
                            value={value}
                            onChange={onChange}
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="mobile no"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="email"
                    //defaultValue={phone}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Email"
                            fontSize={{ base: 'sm', md: 'md' }}
                            minWidth={{ base: 'auto', md: field_width }}
                          />
                          <Input
                            name="email"
                            value={value}
                            p={1}
                            size={{ base: 'sm', md: 'md' }}
                            onChange={onChange}
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="email address"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="igid"
                    //defaultValue={phone}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="IG Id"
                            fontSize={{ base: 'sm', md: 'md' }}
                            minWidth={{ base: 'auto', md: field_width }}
                          />
                          <Input
                            name="igid"
                            value={value}
                            p={1}
                            size={{ base: 'sm', md: 'md' }}
                            onChange={onChange}
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="your Instagram id"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="receiptno"
                    //defaultValue={phone}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Receipt No"
                            fontSize={{ base: 'sm', md: 'md' }}
                            minWidth={{ base: 'none', md: field_width }}
                          />
                          <Input
                            name="receiptno"
                            value={value}
                            p={1}
                            size={{ base: 'sm', md: 'md' }}
                            onChange={onChange}
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="receipt no"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="amount"
                    //defaultValue={phone}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Amount"
                            fontSize={{ base: 'sm', md: 'md' }}
                            minWidth={{ base: 'none', md: field_width }}
                          />
                          <Input
                            name="amount"
                            value={value}
                            type="number"
                            p={1}
                            size={{ base: 'sm', md: 'md' }}
                            onChange={e => onChange(parseFloat(e.target.value))}
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="amount"
                          />
                        </HStack>
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </VStack>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
              <Box>
                <Center>
                  <Heading size={{ base: 'sm', md: 'md' }}>
                    Pls upload your receipt
                  </Heading>
                </Center>
                <ImageUpload
                  files={files}
                  setFiles={setFiles}
                  onDrop={onDrop}
                />
              </Box>
            </form>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Center>
                  <Heading size="lg">Your Lucky Draw No</Heading>
                </Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box>
                  {drawno.length > 0 &&
                    drawno.map(rec => (
                      <Box key={rec.no}>
                        <Center>
                          <Heading size="lg">{rec.no}</Heading>
                        </Center>
                      </Box>
                    ))}
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Center>
    </Flex>
  );
};

export default FormEntry;
