import { PrismaClient } from '@prisma/client';
import { objectType } from 'nexus';
import { Context } from '../../context';

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
    t.nullable.list.field('columns', {
      type: 'Column',
      async resolve(parent, _args, ctx: Context) {
        return await ctx.prisma.board
          .findUnique({
            where: { id: parent.id },
          })
          .columns();
      },
    });
    t.nullable.list.field('cards', {
      type: 'Card',
      async resolve(parent, _args, ctx: Context) {
        return await ctx.prisma.board
          .findUnique({
            where: { id: parent.id },
          })
          .cards();
      },
    });
  },
});
