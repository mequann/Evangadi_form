const router=require('express').Router();
const {answerQuestion} =require('./answer.controller')

router.post('/answer', answerQuestion)



module.exports=router;