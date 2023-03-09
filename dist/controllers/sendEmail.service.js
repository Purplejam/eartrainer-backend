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
        from: 'purplejamkiev@gmail.com',
        subject,
        text,
        html,
    };
    mail_1.default
        .send(msg)
        .then(() => {
        console.log('Email sent');
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.sendEmailSendgrid = sendEmailSendgrid;
const sendVerificationEmail = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Eartrainer | Подтвертите свой email';
    const text = 'Перейдите по ссылке ниже для того, чтобы верифицировать свой email';
    const html = '<strong>А вот и ссылка верификации</strong>';
    yield (0, exports.sendEmailSendgrid)(email, subject, text, html);
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendResetPasswordEmail = (email, name, token, origin) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Eartrainer | Запрос на смену пароля';
    const text = 'Перейдите по ссылке ниже для того, чтобы подтвердить смену пароля';
    const html = `<strong>Ваш токен для верификации ${token}</strong>`;
    yield (0, exports.sendEmailSendgrid)(email, subject, text, html);
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
