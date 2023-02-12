import { ITestItem } from './TestItem.interface';

export interface ICompareServiceReturn {
	result: ITestItem[],
	succeededTests: number
}