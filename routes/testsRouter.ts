import express, {Router} from 'express'
import {getAllTests, getSingleTest, compareAnswers} from '../controllers/tests.controller'

const router: Router = express.Router()

router.route('/').get(getAllTests)
router.route('/compare').post(compareAnswers)
router.route('/:id').get(getSingleTest)

export default router