import { inputObjectType } from 'nexus';

export const createUserInput = inputObjectType({
  name: 'createUserInput',
  definition(t) {
    t.nonNull.string('fullName');
    t.nonNull.string('email'), t.nonNull.string('password');
  },
});

export const loginUserInput = inputObjectType({
  name: 'loginUserInput',
  definition(t) {
    t.nonNull.string('email'), t.nonNull.string('password');
  },
});
