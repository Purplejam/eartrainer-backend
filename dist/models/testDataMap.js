"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDataMapSorting = exports.testDataMapComplexity = void 0;
exports.testDataMapComplexity = new Map([
    ['Beginner', { $gt: 1, $lt: 5 }],
    ['intermediate', { $gt: 3, $lt: 6 }],
    ['Advanced', { $gt: 5 }]
]);
exports.testDataMapSorting = new Map([
    ['New first', '-createdAt'],
    ['Old first', 'createdAt'],
    ['Easy first', 'complexity'],
    ['Hard first', '-complexity']
]);
