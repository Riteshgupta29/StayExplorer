const express= require("express");
const app= express();
const mongoose = require("mongoose");
const path = require("path");
const { url } = require("inspector");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const { date } = require("joi");
const flash = require ("connect-flash");
const passport = require ("passport");
const LocalPassport = require ("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");




const listingRouter = require ("./routes/Listing.js");
const reviewRouter = require ("./routes/review.js");
const userRouter = require ("./routes/user.js");


const mainDB=process.env.ATLAS_TOKEN;

main().then(() =>{
    console.log("connect");
});
async function main() {
    await mongoose.connect(mainDB);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use (express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions = {
    secret: "mySuperString",
    resave: false , 
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true ,
    },
};


 app.get("/", (req, res) =>{
    res.redirect("/Listings")
 });

 

app.use(session (sessionOptions));
app.use (flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalPassport(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.use (( req , res, next ) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
     res.locals.currUser=req.user;
    next();
});





   

app.use("/Listings", listingRouter);
app.use("/Listings/:id/reviews", reviewRouter);
app.use("/", userRouter)

 app.all ( "*", (req, res, next) => {
     next(new ExpressError ( 404, "page not found"));
 });

 app.use((err , req, res, next) =>{
    let { statuscode =500 , message="something is wrong" } = err;
    res.status(statuscode).render("error.ejs", {message});
    });

app.listen(8080, ()=> {
    console.log("i am working baby");
});
