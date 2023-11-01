const express = require('express');
const router = express.Router();
const {register,login,currentUser,loginLine} = require('../controllers/auth')
const {auth,adminCheck} = require('../middleware/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/login-line',loginLine)
router.post('/current-user',auth,currentUser)
router.post('/current-admin',auth,adminCheck,currentUser)







module.exports = router;
