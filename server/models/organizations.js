const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const organizationSchema = mongoose.Schema({
    name: { type: String, required: true },
    contact_email: { type: String, required: true },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Organization", organizationSchema);