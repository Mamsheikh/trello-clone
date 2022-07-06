import { isAuth } from './../../../utils/auth';
import { extendType, nonNull, stringArg } from 'nexus';
import { Context } from '../../context';

export const boardsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('boards', {
      type: 'Board',
      async resolve(_parent, _args, ctx: Context) {
        const decodedJwt = await isAuth(ctx.req);
        return await ctx.prisma.board.findMany({
          where: { user: { id: decodedJwt.userId } },
        });
      },
    });
  },
});

export const boardQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('board', {
      type: 'Board',
      args: { boardId: nonNull(stringArg()) },
      async resolve(_parent, args, ctx: Context) {
        // const decodedJwt = await isAuth(ctx.req);
        return await ctx.prisma.board.findFirst({
          where: {
            AND: [
              { id: args.boardId },
              { userId: 'cl58pyci20017gwdyq8s0nocp' },
            ],
          },
        });
      },
    });
  },
});
