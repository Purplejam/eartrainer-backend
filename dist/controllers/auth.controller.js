"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeUser = exports.resetPassword = exports.forgotPassword = exports.logout = exports.showCurrentUser = exports.verifyUserEmail = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const auth_repository_1 = require("./auth.repository");
const errors_1 = require("../errors");
const sendEmail_service_1 = require("./sendEmail.service");
const http_status_codes_1 = require("http-status-codes");
const UserSchema_1 = require("../models/UserSchema");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        throw new errors_1.BadRequestError('Please provide email, name and password');
    }
    const emailAlreadyExists = yield UserSchema_1.User.findOne({ email });
    if (emailAlreadyExists) {
        throw new errors_1.BadRequestError('Email already exists');
    }
    const user = yield (0, auth_service_1.registerService)(email, name, password);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const origin = 'https://earmentor.onrender.com';
    yield (0, sendEmail_service_1.sendVerificationEmail)(user.email, user.name, origin, user.verificationToken);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: 'Success! Please verify your email',
        verificationToken: user.verificationToken
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError('Please provide email and password');
    }
    const user = yield UserSchema_1.User.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnauthenticatedError('Invalid Credentials');
    }
    const isUserVerified = user.isVerified;
    if (!isUserVerified) {
        throw new errors_1.BadRequestError('Please verify your email');
    }
    const tokenUser = yield (0, auth_service_1.attachCookieService)(req, res, user);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
});
exports.login = login;
const verifyUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationToken, email } = req.query;
    if (!verificationToken || !email) {
        throw new errors_1.BadRequestError('Please provide valid token and email');
    }
    const user = yield UserSchema_1.User.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError('Invalid Credentials');
    }
    if (user.isVerified) {
        throw new errors_1.BadRequestError('This user is already verified!');
    }
    if (user.verificationToken !== verificationToken) {
        throw new errors_1.UnauthenticatedError('Invalid Credentials');
    }
    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = '';
    yield user.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Success! Email has been verified!' });
});
exports.verifyUserEmail = verifyUserEmail;
const showCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'There is no user' });
    }
});
exports.showCurrentUser = showCurrentUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_service_1.logoutService)(req, res);
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'User has logged out!' });
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new errors_1.BadRequestError('Please provide a valid email');
    }
    const passwordToken = yield (0, auth_service_1.forgotPasswordService)(email);
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Please check your email for further actions' });
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { passwordToken, password, email } = req.body;
    if (!passwordToken || !password || !email) {
        throw new errors_1.BadRequestError('Please provide all required data');
    }
    yield (0, auth_service_1.resetPasswordService)(passwordToken, password, email);
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Success! Password reset' });
});
exports.resetPassword = resetPassword;
const subscribeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new errors_1.BadRequestError('Please provide all required data');
    }
    const existingEmail = yield (0, auth_repository_1.findSubscriptionRepository)(email);
    if (existingEmail) {
        throw new errors_1.BadRequestError('You are already subscribed!');
    }
    const newSubscribtion = yield (0, auth_repository_1.createSubscriptionRepository)({
        email, isValid: true
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Success! You are subscribed!' });
});
exports.subscribeUser = subscribeUser;
