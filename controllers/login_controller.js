const User = require('../modals/users');
const bcrypt = require('bcryptjs');

exports.getLogin = (req,res)=>{
  res.render('login');
}

exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email }).exec((err, user) => {
        if (user) {
            let passwordCompare = bcrypt.compareSync(password, user.password);
            if (passwordCompare) {
              User.find({}).exec((err,data)=>{
                if(err){
                  console.log("Error to get data");
                }else{
                  console.log("Data =========>",data);
                    res.render('dashboard',{data:data});
                }
              })

            } else {
                res.render('login',{message: "Invalid password."});
            }
        }else{
          res.render('login',{message:"Invalid credentails."});
        }
    })

}
