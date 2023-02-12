import {ITestItem} from '../models/interfaces/TestItem.interface';

export interface ITestServiceReturn {
	tests: ITestItem[],
	totalTests: number
}