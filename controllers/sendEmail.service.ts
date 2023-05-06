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
	  })
	  .catch((error) => {
	    console.error(error)
	  })
}

export const sendVerificationEmail = async (email: string, name: string, origin: string, verificationToken: string) => {
	const verificationLink = `${origin}/verify-email?verificationToken=${verificationToken}&email=${email}`
	const subject = 'Eartrainer | Verify your email addres'
	const text = 'Verify your email address to complete registration'
	const html = `<strong>To complete your registration, we need you to verify your email address: <a href=${verificationLink}>Verify email</a></strong>`
	await sendEmailSendgrid(email, subject, text, html)
}

export const sendResetPasswordEmail = async (email: string, name: string, passwordToken: string, origin: string) => {
	const verificationLink = `${origin}/reset-password?passwordToken=${passwordToken}&email=${email}`
	const subject = 'Eartrainer | Confirm new password'
	const text = 'Confirm your new password'
	const html = `<strong>To reset your old password, we need you to set up new password here: <a href=${verificationLink}>Set a new password</a></strong>`
	await sendEmailSendgrid(email, subject, text, html)
}