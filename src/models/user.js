const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        trim:true,
        validate(value){

        }
    },
    lastName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Needs an email id");
            }
        }
    },
    password:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a strong password");
            }
        }
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("The profile needs to be an url");
            }
        }
    },
    about:{
        type:String,
        default:"This is a default user about template"
    },
    skills:{
        type:[String],      
        validate(value){
            if(value.length>10){
                throw new Error("Skills limit exceeded");
            }
        }  
    }
});

userSchema.methods.getJWT = async function(){
    const token = await jwt.sign({_id:this._id},'devTinder2505',{expiresIn:'7d'});
    return token;
};

userSchema.methods.validatePassword = async function(passwordByUser){
    const validated = await bcrypt.compare(passwordByUser, this.password);
    return validated;
};

userSchema.statics.fetchUsers = async function(){
    const users = await this.find({});
    console.log("Users fetched: ",users);
    return users;
}

module.exports = mongoose.model("users",userSchema);     
