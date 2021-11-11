import express, { Response, Request} from 'express'
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { requireAuth } from '../../middlewares/require-auth';
import { currentUser } from '../../middlewares/current-user';
import { User } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router()

router.delete(
    '/address/:id', 
    currentUser, 
    requireAuth,
    async (req: Request, res: Response) => {

        let user = await User.findById(req.currentUser!.id)

        if(!user) {
            throw new NotFoundError();
        }

        let updatedUser = await User.findByIdAndUpdate(
                                    {_id: req.currentUser!.id}, 
                                    { $pull: {address: { _id: req.params.id } } },
                                    {new: true} 
                                )
                            
        if(user.address.length === updatedUser!.address.length) {
            throw new NotFoundError()
        }

        return res.status(200).send(updatedUser)
    }
)

export { router as deleteAddressRouter }