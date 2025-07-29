const userModel = require("../model/user");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY= process.env.SECRET_KEY;


const signup = async(req,res)=>{
      const{username,email,password} = req.body;
    try{
    //check existing user
      const existingUser=await userModel.findOne({email:email});
      if(existingUser){
        return res.status(400).json({message: "User already Exist"});
      }
      //creating hashed password
      const hashedPassword = await bcrypt.hash(password,10);

      const result= await userModel.create(
        {
            email:email,
            password:hashedPassword,
            username:username
        }
      );
      //creating token 
      const token = jwt.sign({email:result.email,Id:result._id},SECRET_KEY);
      //sending or creation of user 
      res.status(201).json({user:result,token:token});


    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

const signin = async(req,res)=>{

    //getting info from req
    const{email,password} =req.body;

    try{
           //check n match existing user
          const existingUser=await userModel.findOne({email:email});
           if(!existingUser){
                   return res.status(404).json({message: "User Not Found "});
           }
           //check n match password
           const matchPassword =await bcrypt.compare(password,existingUser.password);
           if(!matchPassword){
            return res.status(400).json({message:"Invalid Password"});
           }
           //creating token
             const token = jwt.sign({email:existingUser,Id:existingUser._id},SECRET_KEY);

             //sending response
            res.status(200).json({user:existingUser,token:token});

    }
    catch{
          console.log(error);
        res.status(500).json({message:"Something went wrong"});

    }

}
module.exports = {signup,signin}