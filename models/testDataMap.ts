import { stringParseType } from './interfaces/stringParse.interface'

export const testDataMapComplexity = new Map<stringParseType, object>([
	['Новичок', {$gt: 1, $lt: 5}], 
	['Средний', {$gt: 3, $lt: 6}], 
	['Продвинутый', {$gt: 5}]
	])

export const testDataMapSorting = new Map<stringParseType, string>([
		['Сначала новые', '-createdAt'],
		['Сначала старые', 'createdAt'],
		['Сначала простые', 'complexity'],
		['Сначала сложные', '-complexity']	
	])
