import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import Layout from '../../components/Layout';

const Boards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createBoardModal = () => {
    return (
      <>
        <Button
          onClick={onOpen}
          leftIcon={<AiOutlinePlus />}
          colorScheme='green'
          size='lg'
          mt='1rem'
        >
          Create a board
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                // value={board.name}
                // onChange={(e) => handleChange(e)}
                placeholder='Board name'
              />
            </ModalBody>
            <ModalFooter>
              <Button loadingText='Creating board'>Create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Layout>{createBoardModal()}</Layout>
    </>
  );
};

export default Boards;
