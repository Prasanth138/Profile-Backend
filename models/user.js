const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
	confirmPassword:{type:String, required:true},
	age:{type:String, default:""},
    gender:{type:String,default:""},
    dob:{type:Date,default:""},
	mobile:{type:String,default:""}

});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "1d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		confirmPassword: passwordComplexity().required().label("Confirm Password"),
		age: Joi.string().label("Age"),
		gender: Joi.string().label("Gender"),
		dob: Joi.date().label("D.O.B"),
		mobile: Joi.string().label("Mobile Number"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };