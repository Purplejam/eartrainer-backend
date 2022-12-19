const express = require('express')
const router = express.Router()
const {getAllTests, getSingleTest, compareAnswers} = require('../controllers/tests')


router.route('/').get(getAllTests)
router.route('/compare').post(compareAnswers)
router.route('/:id').get(getSingleTest)



module.exports = router