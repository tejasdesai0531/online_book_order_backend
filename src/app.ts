import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { routes } from './routes/routes';
import { currentUserRouter } from './routes/auth/current-user';
import { signinRouter } from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';
import { signupRouter } from './routes/auth/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cors from 'cors';

require('dotenv').config()

const app = express();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:8100', 'http://localhost:8101'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use('/api', routes)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
