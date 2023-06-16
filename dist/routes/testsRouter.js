"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const tests_controller_1 = require("../controllers/tests.controller");
const router = express_1.default.Router();
router.route('/').get(tests_controller_1.getAllTests);
router.route('/compare').post(authentication_1.authenticateUser, tests_controller_1.compareAnswers);
router.route('/progress').get(authentication_1.authenticateUser, tests_controller_1.getProgressData);
router.route('/history').get(authentication_1.authenticateUser, tests_controller_1.getProgressHistory);
router.route('/delete-history').delete(authentication_1.authenticateUser, tests_controller_1.deleteProgressHistory);
router.route('/get-totals').get(authentication_1.authenticateUser, tests_controller_1.getTotalHistory);
router.route('/:id').get(tests_controller_1.getSingleTest);
exports.default = router;
