import express, {Router} from 'express'
import {getAllTests, getSingleTest, compareAnswers, getProgressData, getProgressHistory} from '../controllers/tests.controller'
import { authenticateUser } from '../middleware/authentication'


const router: Router = express.Router()

router.route('/').get(getAllTests)
router.route('/compare').post(authenticateUser, compareAnswers)
router.route('/progress').get(getProgressData)
router.route('/history').get(getProgressHistory)
router.route('/:id').get(getSingleTest)


export default router