import { isAuth } from './../../../utils/auth';
import { extendType } from 'nexus';
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
