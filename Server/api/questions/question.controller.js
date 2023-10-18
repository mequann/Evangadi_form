const pool = require("../../config/database");
const{ask,questionByUser}=require('./question.service')
module.exports={
    askQuestion:(req,res)=>{
        const{question,questionDescription}=req.body
        console.log(req.body);
        if(!question||!questionDescription){

            return res.status(400).json({msg:"please enter your question properly!"})
        }
        else{
             pool.promise().query('SELECT registration.user_id FROM registration')
             .then(([row])=>{
                const userid=row[0].user_id;
             req.body.userId = userid;
             console.log(userid,"mmmm")
             ask(req.body,(err,result)=>{
               
                if(err) {
                    console.log(err);
                    return res.status(500).json({ msg: "data connection error from ask" })
                }
                pool.query('SELECT * FROM question WHERE question=?',[question],
                (err,result)=>{

                    if (err) {
                   return     res.status(500).json({ msg: "data conection error from ask2 " });
                      }
                      req.bod.questionId=result[0].question_id
                      return res.status(200).json({data:result})
                }
                )
            }
                )

            }) 
            .catch((err)=>{
                console.log(err.message)
            })
         
        }
    },
    getQuestions:(req,res)=>{
        questionByUser(req.body,(err,results)=>{
            if(err)
            {console.log(err)
        return  res.status(500).json({msg:"data connection error from q"})}
        if(!results){

            return res.status(404).json({msg:"there is not posted question"})
        }
        return res.status(200).json({
            data:results
        })
        })
    }
}