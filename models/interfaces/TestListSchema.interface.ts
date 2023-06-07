import mongoose from 'mongoose'
import { ITestItem } from './TestItem.interface'

export interface ITestListSchema extends mongoose.Document {
	tests: ITestItem[], 
	compareAnswers: Function
}

export interface ISingleAnswer {
	answerId: string,
	answer: string,
}

export class IAnswerObject {
	constructor(isCorrect: boolean) {
		this.isCorrect = isCorrect
	}
	id: string;
	isCorrect: boolean;
	usersAnswer: string;
	correct: string;
	audio: string;
	question: string;
}