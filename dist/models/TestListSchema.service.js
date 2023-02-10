"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareTestsService = void 0;
const TestListSchema_interface_1 = require("./interfaces/TestListSchema.interface");
const compareTestsService = (answerList, testsData) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    let succeededTests = 0;
    for (let answer in answerList) {
        for (let k = 0; k < testsData.length; k++) {
            const answerObject = new TestListSchema_interface_1.IAnswerObject(false);
            answerObject.isCorrect = false;
            if (answerList[answer].answerId === testsData[k].id) {
                answerObject.id = testsData[k].id;
                answerObject.usersAnswer = answerList[answer].answer;
                answerObject.correct = testsData[k].correct;
                answerObject.audio = testsData[k].audio;
                answerObject.question = testsData[k].question;
                if (answerList[answer].answer === testsData[k].correct) {
                    answerObject.isCorrect = true;
                    succeededTests++;
                }
                result.push(answerObject);
                break;
            }
        }
    }
    return { result, succeededTests };
});
exports.compareTestsService = compareTestsService;
