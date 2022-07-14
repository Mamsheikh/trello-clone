import React, { FC, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Input,
  ModalOverlay,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
} from '@chakra-ui/react';

import {
  AiOutlineDelete,
  AiOutlineClose,
  AiOutlineLaptop,
} from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr';
import { AiOutlineDown } from 'react-icons/ai';
import QuillEditor from '../../../QuilEditor';
import CardLabel from './CardLable';
import {
  Card,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '../../../../generated/graphql';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  card: Card;
};

const CardDetailsModal: FC<Props> = ({ onClose, isOpen, card }) => {
  const [updateCard, { loading }] = useUpdateCardMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);

  const handleCardDelete = async () => {
    await deleteCard({
      variables: {
        cardId: card.id,
      },
    });

    onClose();
  };

  const handleModalClose = async () => {
    await updateCard({
      variables: {
        input: {
          cardId: card.id,
          title,
          description,
        },
      },
    });

    onClose();
  };

  //   const handleClick = async (userId) => {
  //     // assignUser(userId);

  //     const data = {
  //       _id: card.id,
  //       title,
  //       description,
  //       columnId: card.columnId,
  //       assignedTo: userId,
  //     };

  //     // await dispatch(updateCard(data));
  //   };

  //   const assignToMenu = () => {
  //     return (
  //       <Menu>
  //         <MenuButton as={Button} size="xs" rightIcon={<AiOutlineDown />}>
  //           Assign To
  //         </MenuButton>
  //         <MenuList>
  //           {users.map((user, index) => (
  //             <MenuItem key={index} onClick={() => handleClick(user._id)}>
  //               {user?.fullName}
  //             </MenuItem>
  //           ))}
  //           <MenuItem onClick={() => handleClick('')}>Unassign</MenuItem>
  //         </MenuList>
  //       </Menu>
  //     );
  //   };

  return (
    <>
      <Modal size='xl' onClose={handleModalClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        {/* https://github.com/chakra-ui/chakra-ui/discussions/2676 */}
        <ModalContent maxW='64rem'>
          <ModalBody>
            {card.type && (
              <Badge bg={card.type} color='white'>
                {card.type}
              </Badge>
            )}
            <Box display='flex' marginTop='1rem'>
              <AiOutlineLaptop />
              <Input
                name='title'
                size='sm'
                marginLeft='1rem'
                value={title}
                fontWeight='bold'
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Card title'
              />
            </Box>
            <Box display='flex'>
              <Box width='100%' marginTop='2rem'>
                <Box display='flex' fontWeight='bold'>
                  <GrTextAlignFull />
                  <Text marginLeft='1rem'>Description</Text>
                </Box>
                <Box marginLeft='1.5rem' minHeight='200px' width='90%'>
                  <QuillEditor value={description} onChange={setDescription} />
                </Box>
              </Box>
              <Box display='flex' flexDirection='column'>
                <CardLabel id={card.id} boardId={card.boardId} />
                {/* {assignToMenu()} */}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              size='xs'
              marginRight='1rem'
              onClick={handleCardDelete}
              //   disabled={cardDelete}
              //   isLoading={cardDelete}
              loadingText='Deleting'
              bg='red.500'
              color='white'
              _hover={{
                backgroundColor: 'red.600',
              }}
            >
              <AiOutlineDelete />
            </Button>
            <Button
              size='xs'
              onClick={handleModalClose}
              //   disabled={cardRequest}
              isLoading={loading}
              loadingText='Updating'
            >
              <AiOutlineClose /> Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardDetailsModal;
