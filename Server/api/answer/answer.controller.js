const pool = require("../../config/database");
const{answerq, anserByUser,answerAndQuestion}=require('./answer.service')
module.exports={
    answerQuestion:(req,res)=>{
        const{answer,userId,questionId}=req.body
        console.log(req.body);
        if(!answer){

            return res.status(400).json({msg:"please enter your answer properly!"})
        }
else{
    answerq(req.body,(err,result)=>{
        console.log(req.body)
        if(err) {
            return res.status(400).json({msg:"data connection erro"})
        }

return res.status(200).json({   
msg:"answer posted successfully",
data:result
})

})
}
        
        
         
        
    },
    // QA:(req,res)=>{
    //     answerAndQuestion((err,results)=>{
    //         if(err) {
    //             return res.status(500).json({msg:"data connection from get answer"})
    //         }
    //         if(!results) {
    //             return res.status(404).json({msg:"there is no answer posted"})
    //         }
    //         return res.status(200).json({data:results})

    //     })

    // },
    getAnswer:(req,res)=>{
        anserByUser((err,results)=>{
            if(err) {
                console.log(err.message)
                return res.status(500).json({msg:"data connection from get answer"})
            }
            if(!results) {
                return res.status(404).json({msg:"there is no answer posted"})
            }
            return res.status(200).json({data:results})
        }
        )
    }
}