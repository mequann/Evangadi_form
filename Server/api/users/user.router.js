const router=require('express').Router();
const auth = require('../middleware/auth');
const {createUser, getUsers, getUserById, logIn}=require('./user.controller');
//create route
router.post('/',createUser);
//get all the users rroute
router.get('/all',getUsers);
//get usersById after autherization
router.get('/',auth,getUserById);
//routting of login
router.post('/login',logIn);
module.exports=router
