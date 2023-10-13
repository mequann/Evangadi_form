const pool = require("../../config/database");
module.exports = {
  register: (data, callback) => {

    // const {userName,email,password,userId,firstName,lastName}=req.body
    pool.query(
      `INSERT INTO registration(user_name,user_email,user_password) values(?,?,?)`,
      [data.userName, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  profile: (data, callback) => {
    console.log(data,"from profile")
    pool.query(
      `INSERT INTO profile(user_id,first_name,last_name) values(?,?,?)`,
      [data.userId, 
        data.firstName, 
        data.lastName],
      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result);
      }
    );
  },
  userById: (id, callback) => {
    pool.query(
      `SELECT registration.user_id,user_name,user_email,first_name,last_name FROM registration LEFT JOIN profile ON registration.user_id=profile_user_id WHERE registration.user_id=?`,
      [id],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result[0]);
      }
    );
  },
  getuserByEmail: (email, callback) => {
    pool.query(
      `SELECT * FROM registration WHERE user_email=?`,
      [email],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  getallUser: (callback) => {
    pool.query(
      `SELECT user_id,user_name,user_email FROM registration`,
      [],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
};
