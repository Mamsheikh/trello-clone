import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import prisma from '../lib/prisma';

export type Context = {
  req:
    | NextApiRequest
    | (IncomingMessage & {
        cookies: NextApiRequestCookies;
      });
  res: NextApiResponse | ServerResponse;
  prisma: PrismaClient;
};

export async function createContext({ req, res }): Promise<Context> {
  return {
    req,
    res,
    prisma,
  };
}
