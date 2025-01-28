const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,

    },
    password:String,
    address:String,
})
const Usermodel=mongoose.model('User',UserSchema);
module.exports=Usermodel;