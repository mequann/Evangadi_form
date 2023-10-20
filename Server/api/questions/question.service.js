const pool =require('../../config/database')
// const user_id=require("../../api/users/user.controller")
module.exports={

    ask:(data,callback)=>{
        
        pool.query('INSERT INTO question( user_id,question,question_description,question_code_block  , post_id) values(?,?,?,?,?)',
        [data.userId,data.question,data.qdescription, data.question_code_block,data.post_id],
        (err,result)=>{
if(err){
 return callback(err)
}
return callback(null,result)
        }

        )
    },
questionByUser:(callback)=>{
    pool.query('SELECT user_name,question_id,question,question_description FROM registration JOIN question ON  registration.user_id=question.user_id'
    ,(err,result)=>{
        if(err) {
            return callback(err)
            
        }
        console.log(result)
        return callback(null,result)
    })
},
// getallQuestions:(callback)=>{
//     pool.query('SELECT * FROM  question',[],(err,result)=>{
//         if(err) 
//         {
//             return callback(err)
//         }

//         return callback(null,result)
//     })
// }
}