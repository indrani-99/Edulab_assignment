const access=(...roles)=>{
    return (req,res,next)=>{
       if(roles.includes("admin"))
        next();
       else
       res.send("You don't have access");
    }
}

module.exports={access};