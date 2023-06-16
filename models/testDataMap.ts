import {stringParseType} from './interfaces/stringParse.interface'

export const testDataMapComplexity = new Map<stringParseType, object>([
	['Beginner', {$gt: 1, $lt: 5}], 
	['intermediate', {$gt: 3, $lt: 6}], 
	['Advanced', {$gt: 5}]
	])

export const testDataMapSorting = new Map<stringParseType, string>([
		['New first', '-createdAt'],
		['Old first', 'createdAt'],
		['Easy first', 'complexity'],
		['Hard first', '-complexity']	
	])
