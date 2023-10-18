const pool =require('../../config/database')
// const user_id=require("../../api/users/user.controller")
module.exports={

    ask:(data,callback)=>{
        
        pool.query('INSERT INTO question( user_id,question,question_description,question_code_block  , post_id) values(?,?,?,?,?)',
        [data.userId,data.question,data.questionDescription, data.question_code_block,data.post_id],
        (err,result)=>{
if(err){
 return callback(err)
}
return callback(null,result)
        }

        )
    },
questionByUser:(id,callback)=>{
    pool.query('SELECT user_id,user_name FROM registration  RIGHT JOIN question ON  registration.user_id=question.user_id   WHERE registration.user_id=?',[id]
    ,(err,result)=>{
        if(err) {
            return callback(err)
            
        }
        return callback(null,result)
    })
}
}