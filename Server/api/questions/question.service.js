const pool =require('../../config/database')
// const user_id=require("../../api/users/user.controller")
module.exports={

    ask:(data,callback)=>{
        
        pool.query('INSERT INTO question( user_id,question,question_description) values(?,?,?)',
        [data.userId,data.question,data.qdescription],
        (err,result)=>{
if(err){
 return callback(err)
}
return callback(null,result)
        }

        )
    },
questionByUser:(callback)=>{
    pool.query('SELECT user_name,question.question_id,question,question_description ,registration.user_id,time FROM registration JOIN question ON  registration.user_id=question.user_id  ORDER BY question_id DESC'
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