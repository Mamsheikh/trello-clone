import { extendType, nonNull, stringArg } from 'nexus';
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
        console.log(decodedJwt.userId);
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
