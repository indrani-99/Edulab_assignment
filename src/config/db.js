const mongoose=require('mongoose');

const connectionWithDB=async ()=>{
    try{
        await mongoose.connect('mongodb+srv://paulindrani999:indrani@cluster0.isowbn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Database connected");
    }
    catch(err){
        console.log("Unable to connect with DB");
    }
}

module.exports={
    connectionWithDB
}