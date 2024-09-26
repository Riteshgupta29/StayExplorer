const express= require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/WrapAsync");
const {validateReview, isLoggedIN, isReviewAuthor}= require("../middleware.js");



const controller = require("../controllers/review.js")  



//review
//post review route
router.post("/" , isLoggedIN, validateReview ,wrapAsync(controller.postReview));
 
 //delete review route
 router.delete("/:reviewId", isLoggedIN,isReviewAuthor, wrapAsync(controller.deleteReview));

     
 
  module.exports = router;
