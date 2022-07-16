import { createUserInput, loginUserInput } from './../inputs/user';
import { extendType, nonNull } from 'nexus';
import { hash, compare } from 'bcrypt';
import { serialize } from 'cookie';
import nookies from 'nookies';
import { User } from '../models';
import { registrationValidation } from '../../../utils/registrationValidation';
import { PrismaClient } from '@prisma/client';
import { createToken } from '../../../utils/jwt';
import { CookieSerializeOptions } from 'next/dist/server/web/types';
import { Context } from '../../context';

export const userSignupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: User,
      args: { input: nonNull(createUserInput) },
      resolve: async (_parent, { input }, ctx) => {
        await registrationValidation.validate(input);
        const user = await ctx.prisma.user.findUnique({
          where: { email: input.email },
        });
        if (user) {
          throw new Error('Email already taken');
        }

        const passHash = await hash(input.password, 7);
        const newUser = await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: passHash,
            fullName: input.fullName,
          },
        });
        return newUser;
      },
    });
  },
});

export const userLoginMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'User',
      args: { input: nonNull(loginUserInput) },
      resolve: async (_parent, { input }, { prisma, res }: Context) => {
        await registrationValidation.validate(input);

        const existingUser = await getExistingUser(input, prisma);

        const encodedToken = await createToken(
          { userId: existingUser.id },
          {
            expiresIn: '7d',
          }
        );
        // console.log(encodedToken);
        // nookies.set({ res }, 'sid', encodedToken, {
        //   httpOnly: true,
        //   domain: 'http://localhost:3000',
        //   maxAge: 60 * 60 * 24 * 7, // 7d
        //   sameSite: true,
        //   path: '/',
        // } as CookieSerializeOptions);
        res.setHeader(
          'Set-Cookie',
          serialize('sid', encodedToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 1000,
            sameSite: 'strict',
            path: '/',
          })
        );

        return existingUser;
      },
    });
  },
});

export const logoutMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('logout', {
      type: 'Boolean',
      async resolve(_parent, _args, { res }) {
        res.setHeader(
          'Set-Cookie',
          serialize('sid', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/',
          })
        );
      },
    });
  },
});

const getExistingUser = async (
  credentials: { email: string; password: string },
  prisma: PrismaClient
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
    select: { email: true, password: true, id: true, fullName: true },
  });

  const passwordMatch = await compare(
    credentials.password,
    (existingUser?.password as string) || ''
  );

  if (!existingUser || !passwordMatch) {
    throw new Error('Incorrect username or password!');
  }

  return existingUser;
};
