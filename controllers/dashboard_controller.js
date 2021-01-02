const User = require('../modals/user');

exports.getDashboard = (req,res)=>{
  User.find({}).exec((err,data)=>{
    console.log("Data get from database", data);
    if(err){
      console.log("Error in getting data");
    }else{
      console.log("Data of all users", data);
        res.render('dashboard',{data:data});
    }
  })

}
