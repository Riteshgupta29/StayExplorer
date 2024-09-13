const User = require("../models/user");

module.exports.getSingup=(req, res ) => {
    res.render("user/singup.ejs");
 };

module.exports.postSingup = async(req, res ) =>{
    try{ let { username, email, password}= req.body;
    const newUser =new User ({email, username});
    const registerdUser = await User.register(newUser , password);
    req.login(registerdUser,(err) =>{
    if(err){
       return next(err);
    }
    req.flash("success"," welcome to stayExplorer");
    res.redirect("/Listings");
    })
    
 }catch(e){
 req.flash("error",e.message);
 res.redirect("/singup");
    }
 };

 module.exports.getLogin =(req, res )=> {
    res.render("user/singup.ejs");
 };

 module.exports.postLogin = async (req , res )=> {
    req.flash("success" , "welcome to StayExplorer");
    let redirectUrl= res.locals.redirectUrl || "/Listings";
    res.redirect(redirectUrl);
 };

 module.exports.logout =  (req, res, next) =>{
    req.logout((err) =>{
       if(err){
          return next(err);
       }
       req.flash("success", "you are logged out");
       res.redirect("/Listings");
    })
 };