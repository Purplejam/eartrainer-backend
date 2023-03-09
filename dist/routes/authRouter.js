"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router.route('/register').post(auth_controller_1.register);
router.route('/verify-email').post(auth_controller_1.verifyUserEmail);
router.route('/login').post(auth_controller_1.login);
router.route('/show-me').get(authentication_1.authenticateUser, auth_controller_1.showCurrentUser);
router.route('/logout').patch(authentication_1.authenticateUser, auth_controller_1.logout);
router.route('/forgot-password').post(auth_controller_1.forgotPassword);
router.route('/reset-password').post(auth_controller_1.resetPassword);
exports.default = router;
