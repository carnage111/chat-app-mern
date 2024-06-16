import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs'

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
            validator:function(value){
                this.password === value
            },
            message: "Password and confirm password doesn't match! Please check your passwords!"
        },
        select:false //this will not show the confirmPassword field in the output when we get the user data
    },
    picture:{
        type:String,
        // default:"default.jpg"
    }
},{
    timestamps:true
})


//pre hook = before saving the document
userSchema.pre('save', async (next)=>{
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})



userSchema.methods.verifyPassword = async function(pwd,pwdDb){
    return await bcrypt.compare(pwd,pwdDb)
}

let User = model("User", userSchema)

export default User;