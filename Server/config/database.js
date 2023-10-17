const mysql = require("mysql2");
const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});
let registration = `CREATE TABLE if not exists registration(
        user_id int auto_increment,
        user_name varchar(255) not null,
        user_email varchar(255) not null,
        user_password varchar(255) not null,
        PRIMARY KEY(user_id)
    )`;
let profile = `CREATE TABLE if not exists profile(
        user_profile_id int auto_increment,
        user_id int not null,
        first_name  varchar(20) not null,
        last_name varchar(20) not null,
        PRIMARY KEY(user_profile_id),
        FOREIGN KEY (user_id)  REFERENCES registration(user_id)

    )`;
let question = `CREATE TABLE if not exists question(
        question_id int auto_increment,
        question varchar(255) not null,
        question_description varchar(255) not null,
        question_code_block varchar(255),
        tags varchar(255),
        post_id varchar(255) not null,
        user_id int not null,
        PRIMARY KEY (question_id),
        UNIQUE KEY (post_id),
        FOREIGN KEY (user_id) REFERENCES registration(user_id)
    )`;
let answer = `CREATE TABLE if not exists answer(
answer_id int auto_increment,
answer varchar(255) not null,
answer_code_block varchar(255),
user_id int not null, 
question_id int not null ,
PRIMARY KEY (answer_Id) ,

FOREIGN KEY (user_Id)  REFERENCES registration(user_Id),
FOREIGN KEY (question_Id)  REFERENCES question(question_Id)

    )`;
pool.query(registration,(err,result)=>{
    if(err){
        console.log(err.message)
    }
    console.log("registration table is created")

});
pool.query(question, (err, result) => {
  if (err) {
    console.log(err.message);
  }
  console.log("question table is created");
});
pool.query(profile, (err, result) => {
  if (err) console.log(err.message);
  console.log("profile table is created");
});
pool.query(answer,(err,result)=>{
    if(err)
     console.log(err.message)
    console.log("answer table is created")

});
pool.getConnection(function (err, connection) {
  if (err) throw err.message;
  console.log("database is  connected successfully");
});
module.exports = pool;
