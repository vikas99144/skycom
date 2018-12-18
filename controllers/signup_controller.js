const mongoose = require('mongoose');
const userSchema = require('../modals/users');
const User = mongoose.model('user',userSchema);
const bcrypt = require('bcryptjs');

exports.getSignup = (req,res)=>{
  res.render('signup');
}

exports.postSignup = (req, res)=>{
    let username = req.body.username;
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.password;
    let repeat_password = req.body.repeat_password;
    let password = bcrypt.hashSync(req.body.password,8);

    if (name !== '' || email !== '' || password !== '' || repeat_password !== '') {
      if(pass !== repeat_password){
        res.render('signup',{message:"Confrim Passwod is not matching"});
      }else{
        User.findOne({email:email}).exec((err,user)=>{
            if(user){
                    console.log("User already exists. Try another email");
                    res.render('signup',{message:"User already exists. Try another email"});
            }else{
                let newUser = new User();
                newUser.username = username;
                newUser.name = name;
                newUser.email = email;
                newUser.password = password;
                newUser.save((err) => {
                    if (err) {
                        console.log("Data is not saved in database.")
                        res.render('signup',{message:"Data is not saved in database."});
                    } else {
                      console.log("Data saved successfully.");
                        res.render('signup',{message: "Data saved successfully."});
                    }
                })

            }
        })
      }

  }

}
