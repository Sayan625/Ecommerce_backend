const e = require('express');
const jwt=require('jsonwebtoken')

//verification middlewere
function Verifytoken(req,res,next){

    const token=req.headers.token;
    if(token){

        jwt.verify(token,process.env.JWT_KEY,(err,data)=>{
            if(err)
                return res.send("invalid token")
            else
            req.data=data;
            next()
        })


    }
    else{
        return res.send("not authenticated")
    }
}

module.exports={Verifytoken};