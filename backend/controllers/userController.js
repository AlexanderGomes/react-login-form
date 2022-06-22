const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/usermodel')

//@desc Register new user
//@router POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
     const {name, email, password} = req.body
     if(!name || !email || !password) {
        res.status(400).json({message: 'fill all fields'})
     }
     
     const userExists = await User.findOne({email})
     if(userExists) {
        res.status(400).json('user already exists')
     }

     //hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)


     //create user
     const user = await User.create({
        name, email, password:hashedPassword
     })

     if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
     } else {
        res.status(400).json('invalid user data')
     }
})

//@desc Authenticate a user
//@router POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
     const {email, password} = req.body
     const user = await User.findOne({email})

     if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
     } else {
        res.status(400).json('invalid credentials')
     }

})


//geretate token
 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
 }


//@desc get user data
//@router GET /api/me
//@access private
const getMe = asyncHandler (async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)


    res.status(200).json({id:_id, name, email})
})




module.exports = {
    registerUser,
    loginUser,
    getMe
}