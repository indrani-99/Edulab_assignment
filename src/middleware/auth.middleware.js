
const jwt=require('jsonwebtoken');
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(token)
    {
        jwt.verify(token, process.env.KEY, (err,result)=>{
            if(err)
                res.send(err);
            else{
                req.body.userid=result.userid;
                next();
            }
        })
    }
}

module.exports={
    auth
}