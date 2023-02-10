"use strict";
const mongoose = require('mongoose');
const AnswersSchema = new mongoose.Schema({
    answer: {
        type: String,
    }
});
module.exports = {
    AnswersSchema
};
