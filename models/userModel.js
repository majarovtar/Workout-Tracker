const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const {hash} = require("bcrypt");
const bycrypt = require("bcrypt");

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function (email, password){

    // validation
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is too weak")
    }

    const exists = await this.findOne({ email }); // ce ze obstaja email

    if (exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email });

    if(!user){
        throw Error("Email incorrect")
    }

    const match = await bycrypt.compare(password, user.password);

    if(!match){
        throw Error("Password incorrect")
    }

    return user

}
module.exports = mongoose.model('User', userSchema);
