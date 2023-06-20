import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
import {Request, Response} from 'express'

export const sendEmailSendgrid = async (to: string, subject: string, text: string, html: string): Promise<void> => {
	const apiKey = process.env.SENDGRID_API_KEY
	const sendGrid = process.env.SENDGRID_EMAIL
	sgMail.setApiKey(apiKey as string)

	const msg = {
	  to, 
	  from: sendGrid as string, 
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

export const sendVerificationEmail = async (email: string, name: string, origin: string, verificationToken: string): Promise<void>  => {
	const verificationLink = `${origin}/verify-email?verificationToken=${verificationToken}&email=${email}`
	const subject = 'EARMENTOR | Verify Your Email'
	const text = 'Verify Your Email Address To Complete Registration'
	const html = `<strong>To complete your registration, we need you to verify your email address: <a href=${verificationLink}>Verify email</a></strong>`
	await sendEmailSendgrid(email, subject, text, html)
}

export const sendResetPasswordEmail = async (email: string, name: string, passwordToken: string, origin: string): Promise<void>  => {
	const verificationLink = `${origin}/reset-password?passwordToken=${passwordToken}&email=${email}`
	const subject = 'EARMENTOR | Confirm New Password'
	const text = 'Confirm Your New Password'
	const html = `<strong>To reset your old password, please set up a new password here: <a href=${verificationLink}>Set a new password</a></strong>`
	await sendEmailSendgrid(email, subject, text, html)
}