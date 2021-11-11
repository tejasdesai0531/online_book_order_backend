import express from 'express'

import { signinRouter } from './signin';
import { signupRouter } from './signup';
import { signoutRouter } from './signout';
import { currentUserRouter } from './current-user';

const router = express.Router();

router.use(signinRouter)
router.use(signupRouter)
router.use(signoutRouter)
router.use(currentUserRouter)

export { router as authRouter }

