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

export const updateCardSequenceInput = inputObjectType({
  name: 'updateCardSequenceInput',
  definition(t) {
    t.nullable.string('cardId');
    t.nonNull.string('columnId');
    t.nonNull.int('sequence');
  },
});
