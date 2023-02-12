"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const customApiError_1 = require("./customApiError");
class UnauthenticatedError extends customApiError_1.CustomAPIError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
