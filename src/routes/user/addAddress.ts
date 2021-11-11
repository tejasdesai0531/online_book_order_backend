import express, { Response, Request} from 'express'
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { requireAuth } from '../../middlewares/require-auth';
import { currentUser } from '../../middlewares/current-user';
import { User } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router()

router.post(
    '/address', 
    currentUser, 
    requireAuth, 
    [
        body('line1').not().isEmpty().withMessage('Line1 name is required'),
        body('line2').not().isEmpty().withMessage('Line2 name is required'),
        body('pincode').not().isEmpty().withMessage('Pincode is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        let user = await User.findById(req.currentUser!.id)

        if(!user) {
            throw new NotFoundError();
        }

        const { line1, line2, pincode } = req.body

        const address = {
            line1,
            line2,
            pincode
        }

        if(user.address) 
            user.address.push(address)
        else 
            user.address = [address]

        await user.save()

        res.status(201).send(user)
    }
)

export { router as addAddressRouter }