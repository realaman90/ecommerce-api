const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');
const { func } = require('joi');
const bcrypt = require('bcryptjs/dist/bcrypt');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },

    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,

    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});
UserSchema.pre('save', async function() {

    if (!this.isModified('password')) return;
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function(enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch
}

module.exports = mongoose.model('Users', UserSchema);