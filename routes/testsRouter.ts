import express, {Router} from 'express'
import {authenticateUser} from '../middleware/authentication'
import {deleteProgressHistory, getAllTests, getSingleTest, compareAnswers, getProgressData, getProgressHistory, getTotalHistory} from '../controllers/tests.controller'


const router: Router = express.Router()

router.route('/').get(getAllTests)
router.route('/compare').post(authenticateUser, compareAnswers)
router.route('/progress').get(authenticateUser, getProgressData)
router.route('/history').get(authenticateUser, getProgressHistory)
router.route('/delete-history').delete(authenticateUser, deleteProgressHistory)
router.route('/get-totals').get(authenticateUser, getTotalHistory)
router.route('/:id').get(getSingleTest)


export default router