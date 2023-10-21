const pool = require("../../config/database");
// const userId=require('../../api/users/user.controller')

module.exports = {
  answerq: (data, callback) => {
    pool.query(
      "INSERT INTO answer( user_id,answer,answer_code_block ,question_id) values(?,?,?,?)",
      [data.userId, data.answer, data.questionId],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  anserByUser:(callback)=>{
    pool.query('SELECT user_id,user_name ,question_id, question FROM registration ,question JION answer ON registration.user_id=answer.user_id =question.user_id '
    
    ,(err,result)=>{
      if(err) {
        return callback(err)
        
      }
      return callback(null,result)
    })
  },
  // answerAndQuestion:(callback)=>{
  //   pool.query('SELECT question_id,question ,question_description FROM question JION answer ON question.question_id=answer.question_id ?',
  //   (err,result)=>{
  //     if(err) {
  //       return callback(err)
        
  //     }
  //     return callback(null,result)
  //   })
  // }
};
