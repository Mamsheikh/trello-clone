import { extendType, nonNull, stringArg, nullable, intArg } from 'nexus';
import { isAuth } from '../../../utils/auth';
import { Context } from '../../context';
import { updateCardInput, updateCardSequenceInput } from '../inputs';

export const createCardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createCard', {
      type: 'Card',
      args: {
        columnId: nonNull(stringArg()),
        boardId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx: Context) {
        const decodedJwt = await isAuth(ctx.req);

        const board = await ctx.prisma.board.findUnique({
          where: { id: args.boardId },
          select: { cards: true, id: true, userId: true },
        });

        if (board.userId !== decodedJwt.userId) {
          throw new Error('not authorized');
        }

        const cards = board.cards;
        const filteredCards = cards.filter(
          (card) => card.columnId === args.columnId
        );

        let sequence = 1;

        if (filteredCards.length > 0) {
          sequence = filteredCards[filteredCards.length - 1].sequence + 1;
        }

        return await ctx.prisma.card.create({
          data: {
            title: 'Add Title',
            board: { connect: { id: args.boardId } },
            column: { connect: { id: args.columnId } },
            sequence,
            assignedTo: { connect: { id: decodedJwt.userId } },
            description: '',
          },
        });
      },
    });
  },
});

export const updateCardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateCard', {
      type: 'Card',
      args: { input: nullable(updateCardInput) },
      async resolve(_parent, { input }, ctx: Context) {
        return await ctx.prisma.card.update({
          where: { id: input.cardId },
          data: {
            bgColor: input.bgColor,
            type: input.type,
            title: input.title,
            description: input.description,
            sequence: input.sequence,
          },
        });
      },
    });
  },
});

export const updateCardSequenceMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateCardSequence', {
      type: 'Card',
      args: { input: nullable(updateCardSequenceInput) },
      async resolve(_parent, { input }, ctx: Context) {
        // const cards = await ctx.prisma.board
        //   .findUnique({
        //     where: { id: input.boardId },
        //   })
        //   .cards();

        return await ctx.prisma.card.update({
          where: { id: input.cardId },
          data: {
            bgColor: input.bgColor,
            columnId: input.columnId,
            type: input.type,
            title: input.title,
            description: input.description,
            sequence: input.sequence,
          },
        });
      },
    });
  },
});

export const deleteCardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteCard', {
      type: 'Card',
      args: { cardId: nonNull(stringArg()) },
      async resolve(_parent, { cardId }, ctx: Context) {
        const decodedJwt = await isAuth(ctx.req);

        const card = await ctx.prisma.card.findFirstOrThrow({
          where: { id: cardId },
        });
        if (card.userId !== decodedJwt.userId) {
          throw new Error('not authorized');
        }
        return await ctx.prisma.card.delete({
          where: { id: cardId },
        });
      },
    });
  },
});
