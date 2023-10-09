const router=require('express').Router();
const auth = require('../middleware/auth');
const {createUser, getUsers, getUserById, logIn}=require('./user.controller');
router.post('/',createUser);
router.get('/all',getUsers);
router.get('/',auth,getUserById);
router.post('/login',logIn);
module.exports=router
