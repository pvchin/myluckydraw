import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useCustomToast } from '../helpers/useCustomToast';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  ButtonGroup,
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
  SimpleGrid,
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

const UPLOADURL = 'https://api.cloudinary.com/v1_1/dgrsgplam/image/upload';
const DOWNLOADURL = 'https://res.cloudinary.com/v1_1/dgrsgplam/image/upload';
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
  const toast = useCustomToast();
  const FIELD_WIDTH = useBreakpointValue({ base: 20, md: 40 });
  const FONT_SIZE = useBreakpointValue({ base: 10, md: 18 });
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
    isOpen: isVisible,
    onClose: onAlertClose,
    onOpen: onAlertOpen,
  } = useDisclosure({ defaultIsOpen: true });
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
    const { entryformno, abbre } = document[0];

    let newNo = entryformno;
    let newDocNo = '';
    let newArray = [];
    let noCopy = Math.floor(data.amount / 5);
    if ((noCopy < 1)) {
      toast({
        title: 'You need to spend an minimum $5 to claim a lucky draw entry!',
        status: 'warning',
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

      return null;
    } 
    for (let i = 1; i <= noCopy; i++) {
      newNo = newNo + 1;
      const newstrno = (10000 + newNo).toString().substring(1);
      newDocNo = abbre + newstrno;
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
    //onAlertOpen
  };

  const handleClear = () => {
    setValue('name', '');
    setValue('icno', '');
    setValue('mobile', '');
    setValue('email', '');
    setValue('igid', '');
    setValue('receiptno', '');
    setValue('amount', '');
    setFiles([]);
  };
  return (
    <Flex minH="70vh">
      <Stack
        spacing={8}
        mx="auto"
        w={{ base: 'sm', md: 'xl' }}
        py={{ base: 0, md: 1 }}
        //px={{ base: 0, md: 1 }}
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
                      <HStack w="100%" py={{ base: 0, md: 1 }}>
                        <InputLeftAddon
                          children="Name"
                          fontSize={FONT_SIZE}
                          minWidth={FIELD_WIDTH}
                        />

                        <Input
                          p={1}
                          px={2}
                          size={FONT_SIZE}
                          name="name"
                          value={value}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="name"
                          required
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
                      <HStack w="100%" py={{ base: 0, md: 1 }}>
                        <InputLeftAddon
                          children="IC No"
                          fontSize={FONT_SIZE}
                          minWidth={FIELD_WIDTH}
                        />
                        <Input
                          name="icno"
                          p={1}
                          px={2}
                          size={FONT_SIZE}
                          value={value}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="IC No"
                          required
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
                      <HStack w="100%" py={{ base: 0, md: 1 }}>
                        <InputLeftAddon
                          children="Mobile No"
                          fontSize={FONT_SIZE}
                          minWidth={FIELD_WIDTH}
                        />
                        <Input
                          name="mobile"
                          p={1}
                          px={2}
                          size={FONT_SIZE}
                          value={value}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="mobile no"
                          required
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
                          fontSize={FONT_SIZE}
                          minWidth={FIELD_WIDTH}
                        />
                        <Input
                          name="email"
                          value={value}
                          p={1}
                          px={2}
                          size={FONT_SIZE}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="email address"
                          required
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
                          fontSize={FONT_SIZE}
                          minWidth={FIELD_WIDTH}
                        />
                        <Input
                          name="igid"
                          value={value}
                          p={1}
                          px={2}
                          size={FONT_SIZE}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="your Instagram id"
                          required
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
                          fontSize={FONT_SIZE}
                          minWidth={FIELD_WIDTH}
                        />
                        <Input
                          name="receiptno"
                          value={value}
                          p={1}
                          px={2}
                          size={FONT_SIZE}
                          onChange={onChange}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="receipt no"
                          required
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
                          fontSize={FONT_SIZE}
                          minWidth={FIELD_WIDTH}
                        />
                        <Input
                          name="amount"
                          value={value}
                          type="number"
                          p={1}
                          px={2}
                          size={FONT_SIZE}
                          onChange={e => onChange(parseFloat(e.target.value))}
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="amount"
                          required
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
            </VStack>
            <Center>
              <ButtonGroup spacing={10} pb={3}>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  onClick={() => handleClear()}
                >
                  Clear
                </Button>
              </ButtonGroup>
            </Center>
            <Box>
              <Center>
                <Heading size={{ base: 'sm', md: 'md' }}>
                  Pls upload your receipt
                </Heading>
              </Center>
              <ImageUpload files={files} setFiles={setFiles} onDrop={onDrop} />
            </Box>
            <Box>
              <Text fontSize={14}>
                Note: All entries will be checked against your receipt and will be void if incorrect!
              </Text>
              <Center>

              <Text fontSize="md" fontWeight={20} color="red">
                WARNING: Any incorrect entry details will be disqualified!!     
              </Text>
              </Center>
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

      {/* <Alert
        isOpen={isVisible}
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Application submitted!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Thanks for submitting your application. Our team will get back to you
          soon.
        </AlertDescription>
      </Alert> */}
    </Flex>
  );
};

export default FormEntry;
