const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')




async function registerUser (req , res) {
   const {name , email , password} = req.body

   const userExists = await userModel.findOne({email})

   if(userExists){
    return res.status(409)
    .json({
        message: 'user already exists, please login'
    })
   }
   
   const hash = await bcryptjs.hash(password , 10)
   
   const user = await userModel.create({
    name ,
    email,
    password : hash
   })

   const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn : '1d'})
    
   res.cookie('token' , token)

   res.status(201)
   .json({
    message : 'User Register successfully'
   })

}

module.exports = {
    registerUser
}