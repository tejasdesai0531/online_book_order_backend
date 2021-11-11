import express from 'express'

import { getUserRouter } from './getUser';
import { updateUserRouter } from './updateUser';
import { addAddressRouter } from './addAddress';
import { deleteAddressRouter } from './deleteAddress'


const router = express.Router();

router.use(getUserRouter)
router.use(updateUserRouter)
router.use(addAddressRouter)
router.use(deleteAddressRouter)


export { router as userRouter }

