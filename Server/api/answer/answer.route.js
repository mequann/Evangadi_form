const router=require('express').Router();
const {answerQuestion, getAnswer,QA} =require('./answer.controller')

router.post('/', answerQuestion)
// router.get('/qanswer',  QA)
router.get('/qanswer',  getAnswer)




module.exports=router;