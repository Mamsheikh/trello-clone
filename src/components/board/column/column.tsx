import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
} from '@chakra-ui/react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { GrDrag } from 'react-icons/gr';

import debounce from 'lodash.debounce';

import Cards from './cards';
import { CardDetail } from '../../../types/cards';
import {
  BoardDocument,
  Card,
  Column,
  useCreateCardMutation,
  useDeleteColumnMutation,
  useUpdateColumnNameMutation,
} from '../../../generated/graphql';

interface ColumnProps {
  column: Column;
  index: number;
  cards?: Card[];
  id: string;
  showCardDetail?: any;
}
const SingleColumn: React.FC<ColumnProps> = ({
  showCardDetail,
  column,
  index,
  id,
  cards,
}): JSX.Element => {
  const [showEditBox, setEditBoxVisibility] = useState<boolean>(false);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumnName] = useUpdateColumnNameMutation();
  const [createCard] = useCreateCardMutation();
  const [columnName, setColumnName] = useState<string>(column.columnName);
  const cardsInSortedSequence = cards.sort(
    (cardA: Card, cardB: Card) => cardA.sequence - cardB.sequence
  );

  const loadColumnTitle = (draggableProps) => {
    if (showEditBox) {
      return (
        <Input
          bg='white'
          value={columnName}
          size='xs'
          width='60%'
          ml='20px'
          onChange={handleChange}
          onBlur={() => setEditBoxVisibility(false)}
          onKeyDown={handleKeyDown}
        />
      );
    }

    return (
      <Heading
        {...draggableProps}
        as='h6'
        size='sm'
        ml='10px'
        mt='5px'
        textAlign='center'
      >
        <Box display='flex'>
          <GrDrag /> {columnName}
        </Box>
      </Heading>
    );
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setEditBoxVisibility(false);
    }
  };

  const handleCardAdd = async () => {
    // await dispatch(addCard(column._id));
    await createCard({
      variables: {
        columnId: column.id,
        boardId: column.boardId,
      },
      refetchQueries: [
        { query: BoardDocument, variables: { boardId: column.boardId } },
      ],
    });
    // await dispatch(fetchCards());
  };

  const handleChange = (e) => {
    setColumnName(e.target.value);
    handleColumnNameChange(e.target.value);
  };

  const handleColumnDelete = async () => {
    await deleteColumn({
      variables: {
        columnId: id,
      },
    });
  };

  const handleColumnNameChange = useCallback(
    debounce((value) => nameChange(value), 800),
    []
  );

  const nameChange = async (value) => {
    await updateColumnName({
      variables: {
        columnId: id,
        name: value,
      },
    });
  };

  return (
    <Draggable draggableId={column.id} index={index} key={column.id}>
      {(provided) => (
        <Box
          key={index}
          width='272px'
          height='calc(100vh - 90px)'
          overflowY='auto'
          mt='10px'
          mx='10px'
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Box
            bg={column.columnName === 'addColumn' ? '' : '#F0F0F0'}
            pb='5px'
            rounded='lg'
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              {loadColumnTitle(provided.dragHandleProps)}
              <Box my='10px' mr='10px' cursor='grab' display='flex'>
                <Menu>
                  <MenuButton aria-label='Options'>
                    <FiMoreHorizontal />
                  </MenuButton>
                  <MenuList justifyContent='center' alignItems='center'>
                    <MenuItem
                      onClick={() => setEditBoxVisibility(!showEditBox)}
                    >
                      <AiOutlineEdit />
                      <Text marginLeft='5px'>Edit</Text>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleColumnDelete}>
                      <AiOutlineDelete />
                      <Text marginLeft='5px'>Delete</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
            <Droppable droppableId={column.id} type='card'>
              {(provided) => (
                // 2px height is needed to make the drop work when there is no card.
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  minHeight='2px'
                >
                  <Cards
                    showCardDetail={showCardDetail}
                    cards={cardsInSortedSequence}
                  />
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <Button
              size='xs'
              my='10px'
              mx='auto'
              width='80%'
              color='black'
              variant='ghost'
              //   disabled={cardRequest}
              //   isLoading={cardRequest}
              display='flex'
              loadingText='Adding card'
              onClick={handleCardAdd}
            >
              + Add a card
            </Button>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default SingleColumn;
