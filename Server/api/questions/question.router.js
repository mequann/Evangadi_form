const router=require('express').Router();
const {askQuestion}=require('./question.controller')

router.post('/', askQuestion)



module.exports=router;