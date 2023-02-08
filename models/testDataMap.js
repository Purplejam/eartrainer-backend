const testDataMap = new Map([
	['Новичок', {$gt: 1, $lt: 5}], 
	['Средний', {$gt: 3, $lt: 6}], 
	['Продвинутый', {$gt: 5}], 
	['Сначала новые', '-createdAt'],
	['Сначала старые', 'createdAt'],
	['Сначала простые', 'complexity'],
	['Сначала сложные', '-complexity'],
	])

module.exports = {
	testDataMap
}
