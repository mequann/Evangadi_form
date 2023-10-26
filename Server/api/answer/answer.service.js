const pool = require("../../config/database");
// const userId=require('../../api/users/user.controller')

module.exports = {
  answerq: (data, callback) => {
    pool.query(
      "INSERT INTO answer( user_id,answer,question_id,answer_code_block ) values(?,?,?,?)",
      [data.userId, data.answer, data.questionId, ""],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  anserByUser: (callback) => {
    pool.query(
      "SELECT registration.user_id,user_name ,question ,question.question_id,answer FROM registration JOIN question  ON registration.user_id=question.user_id  JOIN answer ON question.question_id =answer.question_id",

      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
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
