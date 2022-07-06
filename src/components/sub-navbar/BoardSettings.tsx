import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  FormHelperText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { AiFillSetting, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Board, useUpdateBoardMutation } from '../../generated/graphql';

interface BoardSettingsProps {
  board: Board;
}

const BoardSettings: React.FC<BoardSettingsProps> = ({ board }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateBoard] = useUpdateBoardMutation();
  const [name, setName] = useState('');
  //   const board = useAppSelector((state) => state.board.board);
  //   const boardDetail = useAppSelector((state) => state.board);
  //   const boardDelete = useAppSelector((state) => state.board.isLoading);
  //   const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = async () => {
    await updateBoard({
      variables: {
        boardId: board?.id,
        name,
      },
    });

    onClose();
  };

  const handleDelete = async () => {
    // await dispatch(deleteBoard());
    // if (boardDetail.status === 'success') {
    //   router.push('/boards');
    // }
  };
  useEffect(() => {
    setName(board?.name);
  }, []);

  return (
    <>
      <Button onClick={onOpen} size='xs' as={Button} m='5px'>
        <AiFillSetting />
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} size='xl' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Board Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted variant='enclosed'>
              <TabList mb='2rem'>
                <Tab>Basic</Tab>
                <Tab>Advance</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormControl id='email'>
                    <FormLabel>Board name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormHelperText>
                      You can change this any time
                    </FormHelperText>
                  </FormControl>
                  <Box alignItems='right'>
                    <Button
                      backgroundColor='success'
                      color='white'
                      onClick={handleSave}
                      //   isLoading={boardDetail.isLoading}
                    >
                      <AiOutlineCheck /> &nbsp; Save
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>To delete your board, Click on Delete button.</p>
                  <Box alignItems='right'>
                    <Button
                      bg='red.500'
                      color='white'
                      onClick={handleDelete}
                      _hover={{
                        backgroundColor: 'red.600',
                      }}
                      //   isLoading={boardDelete}
                      loadingText='Deleting'
                    >
                      <AiOutlineDelete /> &nbsp;Delete
                    </Button>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default BoardSettings;
