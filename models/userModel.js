import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName:{
        type: 'string',
        required: true,
        min: [3, 'name too short']
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        min: [6, 'email too short']
    },
    password:{
        type: 'string',
        required: true,
        min: [6, 'password too short']
    },
    isAdmin:{
        type: 'boolean',
        required: true,
        default: false
    }
}, {
    timestamps: true
})

// add middleware for verifying hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model('User', userSchema);

export default User;