"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDataMapSorting = exports.testDataMapComplexity = void 0;
exports.testDataMapComplexity = new Map([
    ['Новичок', { $gt: 1, $lt: 5 }],
    ['Средний', { $gt: 3, $lt: 6 }],
    ['Продвинутый', { $gt: 5 }]
]);
exports.testDataMapSorting = new Map([
    ['Сначала новые', '-createdAt'],
    ['Сначала старые', 'createdAt'],
    ['Сначала простые', 'complexity'],
    ['Сначала сложные', '-complexity']
]);
