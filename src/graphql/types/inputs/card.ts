import { inputObjectType } from 'nexus';

export const updateCardInput = inputObjectType({
  name: 'updateCardInput',
  definition(t) {
    t.nonNull.string('cardId');
    t.nullable.string('type');
    t.nullable.string('bgColor');
    t.nullable.string('title');
    t.nullable.string('description');
    t.nullable.int('sequence');
  },
});
