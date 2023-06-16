import {ITestSchema} from '../../models/interfaces/TestSchema.interface'

export interface ITestServiceReturn {
	tests: ITestSchema[],
	totalTests: number
}