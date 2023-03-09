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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordService = exports.forgotPasswordService = exports.logoutService = exports.attachCookieService = exports.registerService = void 0;
const UserSchema_1 = require("../models/UserSchema");
const crypto_1 = __importDefault(require("crypto"));
const errors_1 = require("../errors");
const jwt_service_1 = require("./jwt.service");
const createTokenUser_service_1 = require("./createTokenUser.service");
const TokenSchema_1 = require("../models/TokenSchema");
const createHash_1 = require("./createHash");
const registerService = (email, name, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isFirstAccount = (yield UserSchema_1.User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const verificationToken = crypto_1.default.randomBytes(20).toString('hex');
    const user = yield UserSchema_1.User.create({ name, email, password, role, verificationToken });
    return user;
});
exports.registerService = registerService;
const attachCookieService = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = (0, createTokenUser_service_1.createTokenUser)({ name: user.name, id: user._id, role: user.role });
    let refreshToken = '';
    let existingToken = yield TokenSchema_1.Token.findOne({ user: user._id });
    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            throw new errors_1.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken = existingToken.refreshToken;
        (0, jwt_service_1.attachCookiesToResponse)(res, tokenUser, refreshToken);
    }
    else {
        refreshToken = crypto_1.default.randomBytes(20).toString('hex');
        const userAgent = req.headers['user-agent'];
        const ip = req.ip;
        const userToken = { refreshToken, ip, userAgent, user: user._id };
        yield TokenSchema_1.Token.create(userToken);
        (0, jwt_service_1.attachCookiesToResponse)(res, tokenUser, refreshToken);
    }
    return tokenUser;
});
exports.attachCookieService = attachCookieService;
const logoutService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield TokenSchema_1.Token.findOneAndDelete({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
    });
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
});
exports.logoutService = logoutService;
const forgotPasswordService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserSchema_1.User.findOne({ email });
    if (!user) {
        throw new errors_1.BadRequestError('Please provide avalid email');
    }
    const passwordToken = crypto_1.default.randomBytes(20).toString('hex');
    const origin = 'http://localhost:3000';
    const expOneDay = 1000 * 60 * 60 * 24 * 1;
    const passwordTokenExpirationDate = new Date(Date.now() + expOneDay);
    user.passwordToken = (0, createHash_1.hashString)(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    yield user.save();
    return passwordToken;
});
exports.forgotPasswordService = forgotPasswordService;
const resetPasswordService = (token, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserSchema_1.User.findOne({ email });
    if (!user) {
        throw new errors_1.BadRequestError('Please provide avalid email');
    }
    const currentDate = new Date(Date.now());
    if (user.passwordToken === (0, createHash_1.hashString)(token) &&
        currentDate < user.passwordTokenExpirationDate) {
        user.password = password;
        user.passwordTokenExpirationDate = null;
        user.passwordToken = null;
        yield user.save();
    }
});
exports.resetPasswordService = resetPasswordService;
