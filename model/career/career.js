const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const careerSchema = new Schema({
    fullname: {
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
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/]
    },
    phone: {
        type: Number,
        require: 'mobile is require',
        unique: true,
    },


    cityname: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character ']
    },
    jobtype: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character ']
    },
    salaryrange: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character ']
    },

    arefresher: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character ']
    },

    startdate: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character ']
    },

    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Career", careerSchema)