const router=require('express').Router();
const USER=require('../models/USER');
const jwt=require('jsonwebtoken')

//password encryption method base64
function encrypt(string){
    const bufferObj = Buffer.from(string, "utf8");
    const newString = bufferObj.toString('base64');
    return newString;
}

//password decryption method base64
function decrypt(string){
    const bufferObj = Buffer.from(string, "base64");
    const newString = bufferObj.toString("utf8");
    return newString;
}

//reggistering new user
router.post('/register',async (req,res)=>{
    const newUser= new USER(
        {
            username: req.body.username,
            email: req.body.email,
            password: encrypt(req.body.password)

        })
        try {
            const user = await newUser.save()
            res.send(user)
        } catch (error) {
            res.send(error)
        }

});

//login of a user
router.post('/login',async (req,res)=>{

        try {
            const user= await USER.findOne({email: req.body.email});
            if(!user)
            res.send("Incorrect credentials")
            if(user.password ===encrypt(req.body.password)){
                const accessToken=jwt.sign({
                    id:user._id
                },process.env.JWT_KEY,{expiresIn:"3d"});
                
                const {password, ...others}=user._doc

                res.send({...others,accessToken});
            }
            else
            res.send("Incorrect credentials")


        } catch (error) {
            res.send(error)
        }

});

module.exports=router;