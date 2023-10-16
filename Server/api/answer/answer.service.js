const pool = require("../../config/database");
// const userId=require('../../api/users/user.controller')

module.exports = {
  answer: (data, callback) => {
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
};
