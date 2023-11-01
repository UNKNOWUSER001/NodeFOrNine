const express = require('express')
const { listusers, readUsers,changeStatus,changeRole,updateUsers,removeUsers } = require('../controllers/user')
const {auth,adminCheck} = require('../middleware/auth')
const router = express.Router()



router.get('/users/:id',readUsers)
router.get('/users',auth,adminCheck,listusers)
router.put("/users/:id", auth, adminCheck, updateUsers)
router.post('/change-status',auth,adminCheck,changeStatus)
router.post('/change-role',auth,adminCheck,changeRole)
router.delete('/users/:id',auth,adminCheck,removeUsers)







module.exports = router