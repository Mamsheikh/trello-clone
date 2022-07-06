import { PrismaClient } from '@prisma/client';
import { objectType } from 'nexus';

export const Board = objectType({
  name: 'Board',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('backgroundImage');
    t.field('user', {
      type: 'User',
      resolve: async (_parent, _args, { prisma }: { prisma: PrismaClient }) => {
        return await prisma.board
          .findUnique({
            where: { id: _parent.id },
          })
          .user();
      },
    });
  },
});
