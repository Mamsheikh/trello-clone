import { extendType, queryType } from 'nexus';

export const HelloQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('hello', {
      type: 'String',
      resolve: () => 'Hello world!',
    });
  },
});
