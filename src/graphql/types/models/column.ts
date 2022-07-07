import { objectType } from 'nexus';
import { Context } from '../../context';
import { Card } from './card';

export const Column = objectType({
  name: 'Column',
  definition(t) {
    t.string('id');
    t.nullable.string('boardId');
    t.string('boardName');
    t.string('columnName');
    t.int('sequence');
    t.field('board', {
      type: 'Board',
      async resolve(parent, _args, ctx: Context) {
        return await ctx.prisma.column
          .findUnique({
            where: { id: parent.id },
          })
          .board();
      },
    });
    t.nullable.list.field('cards', {
      type: Card,
      async resolve(parent, _args, ctx: Context) {
        return await ctx.prisma.column
          .findFirst({
            where: { id: parent.id },
          })
          .cards();
      },
    });
  },
});
