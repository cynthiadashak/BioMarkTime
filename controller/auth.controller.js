const getSignup = (req, res)=>{
    res.render('auth/signup', {title: 'New Account'})

}

const getSignin = (req, res)=>{
    res.render('auth/signin', {title: 'Welcome back'})
}



const postSignup = (req, res)=>{
    const { } = req.body
}

const postSignin = (req, res)=>{
    
}


module.exports = {
    getSignup,
    getSignin,
    postSignup,
    postSignin,
}