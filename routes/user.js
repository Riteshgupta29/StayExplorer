const express= require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const { authenticate } = require("passport");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");



const controller = require("../controllers/user.js")


router.get("/singup" ,controller.getSingup);

router.post("/singup" , WrapAsync(controller.postSingup) );

router.get("/login", controller.getLogin);

router.post("/login",saveRedirectUrl, passport.authenticate("local", {
   failureRedirect : "/login",
   failureFlash: true,
}) ,controller.postLogin);


router.get("/logout",controller.logout);


module.exports = router;

