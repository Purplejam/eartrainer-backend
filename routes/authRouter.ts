import express, {Router} from 'express'
import { forgotPassword, login, logout, register, resetPassword, verifyUserEmail, showCurrentUser, subscribeUser} from '../controllers/auth.controller'
import { authenticateUser } from '../middleware/authentication';

const router: Router = express.Router()

router.route('/register').post(register)
router.route('/verify-email').post(verifyUserEmail)
router.route('/login').post(login)
router.route('/show-me').get(authenticateUser, showCurrentUser)
router.route('/logout').patch(authenticateUser, logout)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)
router.route('/subscribe').post(subscribeUser)

export default router