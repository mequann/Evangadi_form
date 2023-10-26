const pool = require("../../config/database");
const{ask,questionByUser,getallQuestions}=require('./question.service')
module.exports={
    askQuestion: async (req, res) => {
        const { question, qdescription,userId} = req.body;
      console.log(req.body)
        if (!question || !userId) {
          return res.status(403).json({ msg: "Please enter your question properly!" });
        }
          ask(req.body, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "data connection error from ask" });
            }
      return res.status(200).json({ data: result });
            
          });
        
      },
    getQuestions:(req,res)=>{
        // console.log("dershalew")
        // const {userId}=req.body
        // console.log(userId,'mmmmmnnnn')
        questionByUser((err,results)=>{
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
    },
    // getQuestions:(req,res)=>{
    //     getallQuestions(req.body,(err,results)=>{
    //         if(err) {
    //             console.log(err.message)
    //             return res.status(500).json({msg:"data connection error from444  "})
    //         }
    //         return res.status(200).json({
    //             data:results
    //         })
    //     })
    // }
}