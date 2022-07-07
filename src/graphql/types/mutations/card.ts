import { extendType, nonNull, stringArg, nullable } from 'nexus';
import { isAuth } from '../../../utils/auth';
import { Context } from '../../context';

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
