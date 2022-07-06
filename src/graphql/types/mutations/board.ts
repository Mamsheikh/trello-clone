import { prisma } from '@prisma/client';
import { extendType, nonNull, nullable, stringArg } from 'nexus';
import { isAuth } from '../../../utils/auth';
import { Context } from '../../context';

export const createBoardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createBoard', {
      type: 'Board',
      args: {
        name: nonNull(stringArg()),
      },
      resolve: async (_parent, { name }, ctx: Context) => {
        const decodedJwt = await isAuth(ctx.req);
        return await ctx.prisma.board.create({
          data: {
            name,
            backgroundImage:
              'https://res.cloudinary.com/mamsheikh/image/upload/v1657121201/board-background_quxirl.jpg',
            user: { connect: { id: decodedJwt.userId } },
          },
        });
      },
    });
  },
});

export const updateBoardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateBoard', {
      type: 'Board',
      args: {
        boardId: nonNull(stringArg()),
        name: nullable(stringArg()),
        backgroundImage: nullable(stringArg()),
      },
      async resolve(_parent, args, ctx: Context) {
        const decodedJwt = await isAuth(ctx.req);

        const board = await ctx.prisma.board.findUnique({
          where: { id: args.boardId },
        });

        if (board.userId !== decodedJwt.userId) {
          throw new Error('not authorized');
        }

        return await ctx.prisma.board.update({
          where: { id: board.id },
          data: {
            backgroundImage: args.backgroundImage,
            name: args.name,
          },
        });
      },
    });
  },
});
