import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { CardDetail } from '../../../types/cards';
import { Card } from '../../../generated/graphql';
import SingleCard from './card';

type Props = {
  cards: Card[];
  showCardDetail: (cardId: string) => void;
};

const Cards: FC<Props> = ({ cards, showCardDetail }) => {
  return (
    <>
      {cards?.map((card, index) => (
        <SingleCard
          key={index}
          card={card}
          cardIndex={index}
          showCardDetail={showCardDetail}
        />
      ))}
    </>
  );
};

Cards.propTypes = {
  showCardDetail: PropTypes.func,
};

export default Cards;
