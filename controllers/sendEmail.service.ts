import {Request, Response} from 'express'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

export const sendEmailSendgrid = async (to: string, subject: string, text: string, html: string) => {
	const apiKey = process.env.SENDGRID_API_KEY
	sgMail.setApiKey(apiKey as string)

	const msg = {
	  to, 
	  from: 'purplejamkiev@gmail.com', 
	  subject,
	  text,
	  html,
	}
	sgMail
	  .send(msg)
	  .then(() => {
	    console.log('Email sent')
	  })
	  .catch((error) => {
	    console.error(error)
	  })
}

export const sendVerificationEmail = async (email: string, name: string, origin: string, verificationToken: string) => {
	const verificationLink = `${origin}/verify-email?verificationToken=${verificationToken}&email=${email}`
	const subject = 'Eartrainer | Подтвертите свой email'
	const text = 'Перейдите по ссылке ниже для того подтвержления email'
	const html = `<strong>Перейдите по ссылке ниже для подтвержления email: <a href=${verificationLink}>Подтвердить email</a></strong>`
	await sendEmailSendgrid(email, subject, text, html)
}

export const sendResetPasswordEmail = async (email: string, name: string, passwordToken: string, origin: string) => {
	const verificationLink = `${origin}/reset-password?passwordToken=${passwordToken}&email=${email}`
	const subject = 'Eartrainer | Запрос на смену пароля'
	const text = 'Перейдите по ссылке ниже для того, чтобы подтвердить смену пароля'
	const html = `<strong>Для смены пароля перейдите по ссылке: <a href=${verificationLink}>Новый пароль</a></strong>`
	await sendEmailSendgrid(email, subject, text, html)
}