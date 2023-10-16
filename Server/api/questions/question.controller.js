const pool = require("../../config/database");
const{ask}=require('./question.service')
module.exports={
    askQuestion:(req,res)=>{
        const{question,questionDescription}=req.body
        console.log(req.body);
        if(!question||!questionDescription){

            return res.status(400).json({msg:"please enter your question properly!"})
        }
        else{
            ask(req.body,(err,result)=>{
                if(err) {
                    console.log(err);
                    return res.status(500).json({ msg: "data connection error from ask" })
                }
                pool.query('SELECT * FROM question WHERE question=?',[question],(err,result)=>{

                    if (err) {
                        res.status(500).json({ msg: "data conection error from ask2 " });
                      }
                      req.bod.questionId=result[0].question_id
                }
                )
            }
                )
        }
    }
}