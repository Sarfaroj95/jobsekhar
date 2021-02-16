const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    name: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character ']
    },
    email: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character '],
        unique: true,
        lowercase: true,
        require: 'Email is require',

    },
    phone: {
        type: Number,
        require: 'mobile is require',
        unique: true,
    },
    current_organization: {
        type: String
    },
    jobrole: {
        type: String
    },
    workstatus: {
        type: String
    },
    location: {
        type: String
    },

    // updated
    total_technology: [],
    skillrate: {
        type: String
    },
    skill: {
        type: String
    },
    overall: {
        type: String
    },
    joindate: {
        type: String
    },
    cctc: {
        type: String
    },
    ectc: {
        type: String
    },
    reason: {
        type: String
    },




    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema)