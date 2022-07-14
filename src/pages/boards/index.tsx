import {
  Button,
  Box,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {
  BoardsDocument,
  useBoardsQuery,
  useCreateBoardMutation,
} from '../../generated/graphql';

const Boards = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');

  const { data } = useBoardsQuery();
  const [createBoard, { loading, error }] = useCreateBoardMutation({
    onCompleted: () => {
      toast({
        title: 'Board created.',
        description: "We've created your board for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    },
  });
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
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                placeholder='Board name'
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={async () => {
                  await createBoard({
                    variables: {
                      name,
                    },
                    update(cache, { data: { createBoard } }) {
                      const { boards }: { boards: any } = cache.readQuery({
                        query: BoardsDocument,
                      });
                      cache.writeQuery({
                        query: BoardsDocument,
                        data: { boards: [...boards, createBoard] },
                      });
                    },
                    onCompleted(data) {
                      onClose();
                    },
                  });
                }}
                isLoading={loading}
                loadingText='Creating board'
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const loadExistingBoards = () => {
    return (
      <Box mt='1rem' minWidth='50vw' display='flex' flexWrap='wrap'>
        {data?.boards.map((board, index) => (
          <Link
            key={index}
            href={{
              pathname: '/boards/[id]',
              query: { id: board.id },
            }}
          >
            <Box
              mr='1rem'
              mt='1rem'
              height='150px'
              width='150px'
              background={`linear-gradient(
                rgba(0, 0, 0, 0.4),
                rgba(0, 0, 0, 0.4)
              ),
              url(${board.backgroundImage})`}
              backgroundPosition='center'
              backgroundRepeat='no-repeat'
              backgroundSize='cover'
              borderRadius='5px'
              boxShadow='lg'
              cursor='pointer'
            >
              <Text
                marginTop='calc(50% - 25px)'
                height='25px'
                textAlign='center'
                textTransform='capitalize'
                color='white'
                fontSize='20px'
                fontWeight='bold'
              >
                {board.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Layout>
        {createBoardModal()}
        {loadExistingBoards()}
      </Layout>
    </>
  );
};

export default Boards;
