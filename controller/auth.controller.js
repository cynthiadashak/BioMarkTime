const bcrypt = require('bcrypt')
const { signup } = require('../services/auth.service')

const getSignup = (req, res)=>{
    res.render('auth/signup', {title: 'New Account'})

}

const getSignin = (req, res)=>{
    res.render('auth/signin', {title: 'Welcome back'})
}



const postSignup = (req, res)=>{
    const {name, email, password} = req.body
    bcrypt.hash(password, 10)
        .then((hash)=>{
            signup(name, email, hash)
        })
        .catch((e)=>{
            
        })
}

const postSignin = (req, res)=>{
    
}


module.exports = {
    getSignup,
    getSignin,
    postSignup,
    postSignin,
}