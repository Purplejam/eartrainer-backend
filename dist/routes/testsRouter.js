"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tests_controller_1 = require("../controllers/tests.controller");
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router.route('/').get(tests_controller_1.getAllTests);
router.route('/compare').post(authentication_1.authenticateUser, tests_controller_1.compareAnswers);
router.route('/progress').get(tests_controller_1.getProgressData);
router.route('/:id').get(tests_controller_1.getSingleTest);
exports.default = router;
