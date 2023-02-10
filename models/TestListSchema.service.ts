import { IAnswerObject, ISingleAnswer } from './interfaces/TestListSchema.interface';
import { ITestItem } from './interfaces/TestItem.interface';

export const compareTestsService = async (answerList: ISingleAnswer[], testsData: ITestItem[]) => {
	let result = []
	let succeededTests: number = 0

	for (let answer in answerList) {
		for (let k = 0; k < testsData.length; k++) {
			const answerObject: IAnswerObject = new IAnswerObject(false)
			answerObject.isCorrect = false
			if (answerList[answer].answerId === testsData[k].id) {
				answerObject.id = testsData[k].id
				answerObject.usersAnswer = answerList[answer].answer
				answerObject.correct = testsData[k].correct
				answerObject.audio = testsData[k].audio
				answerObject.question = testsData[k].question
				if (answerList[answer].answer === testsData[k].correct) {
					answerObject.isCorrect = true
					succeededTests++
				}
				result.push(answerObject)
				break
			}
		}
	}

	return {result, succeededTests}
}