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

async function loginUser(req , res){
    const {email , password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404)
        .json({
            message : 'user not found'
        })
    }

    const validPassword = await bcryptjs.compare(password , user.password)

    if(!validPassword){
        return res.status(401)
        .json({
            message : 'Invalid password'
        })
    }


    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn: '1d'})
    res.cookie('token' , token)


    res.status(200)
    .json({
        message: 'User loggedIn successfully'
    })
}





module.exports = {
    registerUser,
    loginUser
}