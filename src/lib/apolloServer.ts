import { ApolloServer } from 'apollo-server-micro';
import { createContext } from '../graphql/context';
import { schema } from '../graphql/schema';
import prisma from './prisma';

const server = new ApolloServer({
  schema,
  context: createContext,
});

export { server };
