import Cors from 'cors';
import initMiddleware from './initMiddleware';

const cors = initMiddleware(
  Cors({
    credentials: true,
    origin: [
      'https://studio.apollographql.com',
      'http://localhost:3000',
      'https://trello-clone-smoky-mu.vercel.app/',
    ],
  })
);

export { cors };
