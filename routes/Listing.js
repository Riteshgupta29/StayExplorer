const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")

const controller = require("../controllers/listing.js")  


//index route
router.get("/", wrapAsync(controller.index )); 

//new route
router.get("/new",isLoggedIn ,controller.new);

//show route
router.get("/:id",  wrapAsync( controller.show));

//creat route
router.post("/", validateListing ,isLoggedIn , wrapAsync (controller.creat)); 

//edit route
router.get("/:id/edit", isLoggedIn ,isOwner,  wrapAsync(controller.edit));

//update route
router.put("/:id",isLoggedIn,isOwner, wrapAsync( controller.update));

//delete route
router.delete("/:id",isLoggedIn, isOwner,  wrapAsync( controller.delete));  

module.exports = router;