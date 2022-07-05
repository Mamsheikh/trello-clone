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
} from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineCreditCard,
  AiOutlineBuild,
  AiOutlinePlus,
} from 'react-icons/ai';
import Link from 'next/link';
import React from 'react';
import NavBar from '../../components/navbar';

const Boards = (props) => {
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

  const { page } = props;
  const sidebarMenu = [
    { path: '/home', buttonName: 'Home', page: 'home', icon: AiOutlineHome },
    {
      path: '/boards',
      buttonName: 'Boards',
      page: 'boards',
      icon: AiOutlineCreditCard,
    },
    {
      path: '/templates',
      buttonName: 'Templates',
      page: 'templates',
      icon: AiOutlineBuild,
    },
    {
      path: '/settings',
      buttonName: 'Settings',
      page: 'settings',
      icon: AiOutlineSetting,
    },
  ];
  return (
    <>
      <NavBar bg='white' />
      <Box display='flex' mt='2%'>
        <Box
          height='80vh'
          width='20vw'
          boxShadow='base'
          rounded='lg'
          p='1em'
          ml='20px'
        >
          <Box display='flex' flexDirection='column'>
            {sidebarMenu.map((menu, index) => (
              <Link href={menu.path} key={index}>
                <Button
                  mt='5px'
                  mb='5px'
                  height='4rem'
                  borderRadius='1rem'
                  boxShadow={page === menu.page ? 'inner' : 'base'}
                  display='flex'
                  justifyContent='left'
                  colorScheme='gray'
                >
                  <>
                    <menu.icon size='20px' /> &nbsp; {menu.buttonName}
                  </>
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
        <Box
          flexGrow={3}
          mx='2%'
          boxShadow='base'
          rounded='lg'
          bg='white'
          p='1rem'
        >
          {createBoardModal()}
          {/* {loadExistingBoards()} */}
        </Box>
      </Box>
    </>
  );
};

export default Boards;
