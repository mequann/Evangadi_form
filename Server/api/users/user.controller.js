const{register,getallUser,userById,getuserByEmail,profile }=require('./user.service')
const pool=require('../../config/database')
const bycrpt=require('bcryptjs')
module.exports={
    createUser:(req,res)=>{
      
        const {userName,firstName,lastName,email,password}=req.body
        console.log(req.body)
        if(!userName||!firstName||!lastName||!email||!password){
          return  res.status(400).json({msg:"Not all fields are not provided!"})
        }
        if(password.length<8)
        return res.status(400).json({msg:"password must be at least 8 characters!"})
    pool.query(`SELECT * FROM registration WHERE user_email=?`,
    [email],
    (err,result)=>{
        if(err)
      { return res.status(err).json({msg:'database connection error'})}
      if(result.length>0){
        return res.status(400).json({msg:'An account with this email have aready exist'})

      }

    else{
let  salt = bcrypt.genSaltSync(10);
req.body.password= bycrpt.hashSync(password, salt);
register(req.body,(err,results)=>{
    if(err){
    console.log(err)
return res.status(500).json({msg:'data connection error'})
    }
    return res.status(200).json({msg:"new user added succesfully",
    data:results

    })
})

    }
}
    )
    }
}
