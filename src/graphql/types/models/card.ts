import { objectType } from 'nexus';
import { Context } from '../../context';
import { Column } from './column';

export const Card = objectType({
  name: 'Card',
  definition(t) {
    t.string('id');
    t.string('boardId');
    t.string('title');
    t.int('sequence'), t.string('description');
    t.nullable.string('type'), t.nullable.string('bgColor');
    t.string('boardId');
    t.string('columnId');
    t.string('userId');
    t.field('board', {
      type: 'Board',
      async resolve(parent, _args, ctx: Context) {
        return await ctx.prisma.card
          .findFirst({
            where: { id: parent.id },
          })
          .board();
      },
    });
    t.field('column', {
      type: Column,
      async resolve(parent, _args, ctx: Context) {
        return await ctx.prisma.card
          .findFirst({
            where: { id: parent.id },
          })
          .column();
      },
    });
  },
});
