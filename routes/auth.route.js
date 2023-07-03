const router = require('express').Router()
const { getSignin, getSignup, postSignin, postSignup } = require('../controller/auth.controller')


router.get('/signin', getSignin)
router.get('/signup', getSignup)


router.post('signin', postSignin)
router.post('/signup', postSignup)

module.exports = router