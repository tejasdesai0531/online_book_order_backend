import express, { Response, Request} from 'express'
import { requireAuth } from '../../middlewares/require-auth';
import { currentUser } from '../../middlewares/current-user';
import { NotFoundError } from '../../errors/not-found-error'

import { User } from '../../models/user';

const router = express.Router()

router.get(
    '/', 
    currentUser, 
    requireAuth, 
    async (req: Request, res: Response) => {

        let user = await User.findById(req.currentUser!.id)

        if(!user) {
            throw new NotFoundError();
        }

        res.status(200).send(user)

    }
)

export { router as getUserRouter }