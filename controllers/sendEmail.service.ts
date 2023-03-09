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

//change after frontend
export const sendVerificationEmail = async (email: string, name: string) => {
	const subject = 'Eartrainer | Подтвертите свой email'
	const text = 'Перейдите по ссылке ниже для того, чтобы верифицировать свой email'
	const html = '<strong>А вот и ссылка верификации</strong>'
	await sendEmailSendgrid(email, subject, text, html)
}

//change after frontend
export const sendResetPasswordEmail = async (email: string, name: string, token: string, origin: string) => {
	const subject = 'Eartrainer | Запрос на смену пароля'
	const text = 'Перейдите по ссылке ниже для того, чтобы подтвердить смену пароля'
	const html = `<strong>Ваш токен для верификации ${token}</strong>`
	await sendEmailSendgrid(email, subject, text, html)
}