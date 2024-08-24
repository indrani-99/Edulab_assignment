const access=()=>{
    return (req,res,next)=>{
       if(req.body.role==='admin')
        next();
       else
       res.send("You don't have access");
    }
}

module.exports={
    access};