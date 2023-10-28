require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./Server/config/database"); 
const app = express();
const userRouter = require("./Server/api/users/user.router");
//question and answer routers
const questionRouter=require('./Server/api/questions/question.router')
const answerRouter=require('./Server/api/answer/answer.route')
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// route for  creating user and profile
app.use("/api/users", userRouter);
//route for question and answer 
app.use('/api/question',questionRouter) 
app.use('/api/answer',answerRouter)   
     
const port = process.env.PORT; 
    
app.listen(port, () => {     

  console.log("listning though port", port); 
});             
                   
              
         
                 
       
                                            