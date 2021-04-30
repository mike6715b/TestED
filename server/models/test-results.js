const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const testResultsSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true }
});

testResultsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("TestResults", testResultsSchema);