import express, { Response, Request} from 'express'
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { requireAuth } from '../../middlewares/require-auth';
import { currentUser } from '../../middlewares/current-user';
import { User } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router()

router.put(
    '/', 
    currentUser, 
    requireAuth, 
    [
        body('firstName').not().isEmpty().withMessage('First name is required'),
        body('lastName').not().isEmpty().withMessage('Last name is required'),
        body('mobile').not().isEmpty().withMessage('Contact number is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        let user = await User.findById(req.currentUser!.id)

        if(!user) {
            throw new NotFoundError();
        }

        const { firstName, lastName, mobile } = req.body

        user.firstName = firstName
        user.lastName = lastName
        user.mobile = mobile

        await user.save()

        res.status(201).send(user);

    }
)

export { router as updateUserRouter }