const pool = require("../../config/database");
const{answerq, anserByUser,answerAndQuestion}=require('./answer.service')
module.exports={
    answerQuestion:(req,res)=>{
        const{answer}=req.body
        console.log(req.body);
        if(!answer){

            return res.status(400).json({msg:"please enter your answer properly!"})
        }
        else{
            pool.promise().query('SELECT registration.user_id,question_id FROM registration JOIN question')
            .then(([row])=>{
                req.body.userId=row[0].user_id
                req.body.questionId=row[0].question_id
               answerq(req.body,(err,result)=>{
                // console.log(req.body,"oooooo")
                if(err) {
                    console.log(err.message);
                    return res.status(500).json({ msg: "data connection error from answer11" })
                };
               
                    // console.log(result)
                   
                    return res.status(200).json({msg:"answer posted successfully", data:result})
                }
                )
                // pool.query('SELECT question_id FROM question ',
                // (err,result)=>{

                //     if (err) {
                //         res.status(500).json({ msg: "data conection error from answer " });
                //       }
                //       req.bod.questionId=result[0].question_id
                //       return res.status(200).json({msg:"your answer was posted",data:result})
                // }
                // );
            
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