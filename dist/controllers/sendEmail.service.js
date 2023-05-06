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
exports.sendResetPasswordEmail = exports.sendVerificationEmail = exports.sendEmailSendgrid = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendEmailSendgrid = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.SENDGRID_API_KEY;
    mail_1.default.setApiKey(apiKey);
    const msg = {
        to,
        from: 'info',
        subject,
        text,
        html,
    };
    mail_1.default
        .send(msg)
        .then(() => {
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.sendEmailSendgrid = sendEmailSendgrid;
const sendVerificationEmail = (email, name, origin, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationLink = `${origin}/verify-email?verificationToken=${verificationToken}&email=${email}`;
    const subject = 'Eartrainer | Verify your email addres';
    const text = 'Verify your email address to complete registration';
    const html = `<strong>To complete your registration, we need you to verify your email address: <a href=${verificationLink}>Verify email</a></strong>`;
    yield (0, exports.sendEmailSendgrid)(email, subject, text, html);
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendResetPasswordEmail = (email, name, passwordToken, origin) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationLink = `${origin}/reset-password?passwordToken=${passwordToken}&email=${email}`;
    const subject = 'Eartrainer | New password';
    const text = 'Confirm your new password';
    const html = `<strong>Confirm your password here: <a href=${verificationLink}>Новый пароль</a></strong>`;
    yield (0, exports.sendEmailSendgrid)(email, subject, text, html);
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
