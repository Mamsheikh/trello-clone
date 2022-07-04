import { createUserInput } from './../inputs/user';
import { extendType, nonNull } from 'nexus';
import { User } from '../models';

export const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: User,
      args: { input: nonNull(createUserInput) },
      resolve: async (
        _parent,
        { input: { email, password, fullName } },
        ctx
      ) => {
        const user = await ctx.prisma.user.create({
          data: {
            email,
            password,
            fullName,
          },
        });
        return user;
      },
    });
  },
});
