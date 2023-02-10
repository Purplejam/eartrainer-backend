"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const http_status_codes_1 = require("http-status-codes");
const customApiError_1 = require("./customApiError");
class BadRequestError extends customApiError_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.BadRequestError = BadRequestError;
