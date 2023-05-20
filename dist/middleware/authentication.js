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
exports.authenticateUser = void 0;
const jwt_service_1 = require("../controllers/jwt.service");
const errors_1 = require("../errors");
const TokenSchema_1 = require("../models/TokenSchema");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, accessToken } = req.signedCookies;
    if (!refreshToken && !accessToken) {
        return next();
    }
    try {
        if (accessToken) {
            const payload = (0, jwt_service_1.isTokenValid)(accessToken);
            if (typeof payload === 'string') {
                throw new errors_1.UnauthenticatedError('Authentication Invalid');
            }
            req.user = payload.user;
            return next();
        }
        if (!refreshToken) {
            throw new errors_1.UnauthenticatedError('Authentication Invalid');
        }
        const payload = (0, jwt_service_1.isTokenValid)(refreshToken);
        if (typeof payload === 'string') {
            throw new errors_1.UnauthenticatedError('Authentication Invalid');
        }
        const existingToken = yield TokenSchema_1.Token.findOne({
            user: payload.user.id,
            refreshToken: payload.refreshToken
        });
        if (!existingToken) {
            return next();
        }
        if (!(existingToken === null || existingToken === void 0 ? void 0 : existingToken.isValid)) {
            throw new errors_1.UnauthenticatedError('Authentication Invalid');
        }
        (0, jwt_service_1.attachCookiesToResponse)(res, payload.user, existingToken.refreshToken);
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError('Authentication Invalid');
    }
});
exports.authenticateUser = authenticateUser;
