const pool =require('../../config/database')
module.exports={

    ask:(data,callback)=>{
        pool.query('INSERT INTO question( user_id,question,question_description,question_code_block ,tags , post_id) values(?,?,?,?,?)',
        [data.userId,data.question,data.questionDescription],
        (err,result)=>{
if(err){
 return callback(err)
}
return callback(null,result)
        }

        )
    },
    answer:(data,callback)=>{
        pool.query('INSERT INTO answer( user_id,answer,answer_code_block ,question_id) values(?,?,?,?)',
        [data.userId,data.answer,data.questionId],
        (err,result)=>{
if(err){
 return callback(err)
}
return callback(null,result)
        }

        )
    }
}