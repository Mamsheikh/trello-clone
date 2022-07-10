import { isAuth } from './../../../utils/auth';
import { extendType } from 'nexus';
import { Context } from '../../context';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      async resolve(_parent, _arg, ctx: Context) {
        const decodedJwt = await isAuth(ctx.req);
        return await ctx.prisma.user.findUniqueOrThrow({
          where: { id: decodedJwt.userId },
        });
      },
    });
  },
});
