import React, { FC } from 'react';
import { Box, Badge, Avatar } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { CardDetail } from '../../../types/cards';
import { Card } from '../../../generated/graphql';
// import { CardDetail } from '@/src/types/cards';
// import { useAppSelector } from '@/src/hooks';

type Props = {
  showCardDetail: (cardId: string) => void;
  cardIndex: number;
  card: Card;
};

const SingleCard: FC<Props> = ({ cardIndex, showCardDetail, card }) => {
  //   const users = useAppSelector((state) => state.users.users);

  const loadAssignedToUser = () => {
    if (!card) return;

    const user = card.assignedTo;
    console.log({ user });

    return (
      <Box display='flex' justifyContent='flex-end'>
        <Avatar size='xs' name={user?.fullName} />
      </Box>
    );
  };

  return (
    // https://github.com/atlassian/react-beautiful-dnd/issues/1767
    <Draggable draggableId={card.id} index={cardIndex} key={card.id}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          m='5px'
          p='10px'
          id={card.id}
          minHeight='80px'
          borderWidth='1px'
          bg='white'
          cursor='pointer'
          borderRadius='md'
          overflow='auto'
          _hover={{
            backgroundColor: 'lightblue',
          }}
          onClick={() => showCardDetail(card.id)}
        >
          {card.type && (
            <Badge bg={card.type} color='white'>
              {card.type}
            </Badge>
          )}
          <p>{card.title}</p>
          {loadAssignedToUser()}
        </Box>
      )}
    </Draggable>
  );
};

export default SingleCard;
