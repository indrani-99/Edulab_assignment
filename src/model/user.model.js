const mongoose=require('mongoose');


const UserSchema=mongoose.Schema({
    username:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    role:{type:String}
})

const TaskUserModel=mongoose.model('TaskUser',UserSchema);

module.exports={
    TaskUserModel
}