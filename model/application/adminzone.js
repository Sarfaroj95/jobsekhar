const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminzoneSchema = new Schema({
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
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/]
    },
    password: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character '],
        require: 'password is required'
    },
    userType: {
        type: String,
        min: [4, 'Too short, short 4 character'],
        max: [32, 'To long, Max is 32 character '],
        require: 'password is required'
    },
    isActived: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

adminzoneSchema.methods.hasSamePasswrod = function (requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
}



adminzoneSchema.pre('save', function (next) {
    const adminzone = this;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(adminzone.password, salt, function (err, hash) {
            adminzone.password = hash;
            next();
        });
    });
});



module.exports = mongoose.model("Adminzone", adminzoneSchema)