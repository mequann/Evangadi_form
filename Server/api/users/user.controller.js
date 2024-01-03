const {
  register,
  getallUser,
  userById,
  getuserByEmail,
  profile,
} = require("./user.service");
const pool = require("../../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { json } = require("express");
module.exports = {
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
  
    if (!userName || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Not all fields are not provided!" });
    }
    console.log(req.body,'lllll');
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "password must be at least 8 characters!" });
    pool.query(
      `SELECT * FROM registration WHERE user_email=?`,
      [email],
      (err, results) => {
        if (err) {
          return res.status(err).json({ msg: "database connection error" });
        }

        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "An account with this email have aready exist" });
        } 
        else {
          let salt = bcrypt.genSaltSync(10);
          req.body.password = bcrypt.hashSync(password, salt);
          console.log(password);

          register(req.body, (err, results) => {

            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "data connection error 33" });
            }
            pool.query(
              `SELECT * FROM registration WHERE user_email=?`,[email],
              (err, results) => {
                if (err) {
                  res.status(500).json({ msg: "data conection error " });
                }
                // console.log("resultsss")
                // console.log(results)
                req.body.userId = results[0].user_id;
                //console.log("user data")
                console.log(req.body);

                profile(req.body, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res   
                      .status(500)
                      .json({ msg: "data connection error 11" });
                  }
                  return res
                    .status(200)
                    .json({ msg: "new user added succesfully", data: results });
                });
              }
            );
          });
        }
      }
    );
  },
  getUsers: (req, res) => {
    getallUser((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "data connection error" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getUserById: (req, res) => {
    userById(
      (req.body,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "data connection error" });
        }
        if (!results) {
          return res.status(404).json({ msg: " record not foound" });
        }
        return res.status(200).json({ msg: results });
      })
    );
  },
  logIn: (req, res) => {
    const { email, password } = req.body;
    console.log(req.body ,"hhhhh")
    //validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been provided" });
    }
    getuserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "data connection err" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email has been registerd" });
      }
      const isMatch = bcrypt.compareSync(password, results.user_password);
      if (!isMatch) {
        return res.status(404).json({ msg: "Invalid credentials" });
      }
      const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          id: results.user_id,
          display_name: results.user_name,
        },
      });
    });
  },
};
