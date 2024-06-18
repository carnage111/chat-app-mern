import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs'
import validator from 'validator';
const isEmail = validator.isEmail

const userSchema = new Schema({
    name: {
        type:String,
        required:[true,"Name is a required field!"],
        minLength:[4,"Name should have at least 4 characters!"],
        trim:true
    },
    email: {
        type:String,
        required:[true,"Name is a required field!"],
        validate:[isEmail,"Invalid email!! Please enter valid email!"],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required Field"],
        minLength:[8,"Password should have at least 8 characters"],
        trim:true
    },
    confirmPassword: {
        type: String,
        validate:{
            validator: function(value){ //here we are using anonymous function because we need to use this keyword, arrow function doesn't have this keyword
                return value === this.password;
            },
            message: "Password and confirm password doesn't match! Please check your passwords!"
        },
        select:false //this will not show the confirmPassword field in the output when we get the user data
    },
    picture:{
        type:String,
        default:"default.jpghttps://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=" //default picture if user doesn't upload any picture
    }
},{
    timestamps:true
})


// pre hook = before saving the document
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})



userSchema.methods.verifyPassword = async function(pwd,pwdDb){
    return await bcrypt.compare(pwd,pwdDb)
}

let User = model("User", userSchema)

export default User;