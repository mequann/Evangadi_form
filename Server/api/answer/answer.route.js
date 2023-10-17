const router=require('express').Router();
const {answerQuestion, getAnswer} =require('./answer.controller')

router.post('/', answerQuestion)
router.get('/qanswer',  getAnswer)



module.exports=router;