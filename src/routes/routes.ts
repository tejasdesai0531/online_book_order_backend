import express from 'express'

import { authRouter } from './auth/index';
import { booksRouter } from './books/index';
import { userRouter } from './user';

const router = express.Router();

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/books', booksRouter)

export { router as routes }

