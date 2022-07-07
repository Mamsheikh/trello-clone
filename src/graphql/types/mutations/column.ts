import { extendType, nonNull, stringArg } from 'nexus';
import { isAuth } from '../../../utils/auth';
import { Context } from '../../context';

export const createColumnMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createColumn', {
      type: 'Column',
      args: {
        boardId: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx: Context) => {
        const decodedJwt = await isAuth(ctx.req);
        const board = await ctx.prisma.board.findUnique({
          where: { id: args.boardId },
          select: {
            columns: true,
            cards: true,
            name: true,
            id: true,
            user: true,
          },
        });

        const columsArray = board.columns;
        const columns = board.columns;
        let sequence = 1;

        if (columns.length > 0) {
          sequence = columsArray[columsArray.length - 1].sequence + 1;
        }

        return await ctx.prisma.column.create({
          data: {
            board: { connect: { id: board.id } },
            sequence,
            columnName: 'Add Title',
            boardName: board.name,
          },
        });
      },
    });
  },
});

export const updateColumnName = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateColumnName', {
      type: 'Column',
      args: {
        name: nonNull(stringArg()),
        columnId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx: Context) {
        const decodedJwt = await isAuth(ctx.req);
        const column = await ctx.prisma.column.findFirst({
          where: { id: args.columnId },
          select: { board: true, id: true },
        });

        if (column.board.userId !== decodedJwt.userId) {
          throw new Error('not authorized');
        }

        return await ctx.prisma.column.update({
          where: { id: args.columnId },
          data: {
            columnName: args.name,
          },
        });
      },
    });
  },
});
