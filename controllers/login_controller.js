const User = require('../modals/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req,res)=>{
  res.render('login');
}

exports.postLogin =  (req, res) => {
  console.log("==== data from frontend ====", req.body);
    let email = req.body.email;
    let password = req.body.password;
    // console.log("=====================",data);
    User.find({email: email }, function(err, user) {
      if(err){
        console.log("==== error to find body == error error ===",err);
      }
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
