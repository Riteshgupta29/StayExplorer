const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });

const controller = require("../controllers/listing.js");

router
  .route("/")
  .get(wrapAsync(controller.index))
  .post(
    isLoggedIn,
    upload.single("vlisting[image]"),
    validateListing,
    wrapAsync(controller.creat)
  );

//new route
router.get("/new", isLoggedIn, controller.new);

router
  .route("/:id")
  .get(wrapAsync(controller.show))
  .put(isLoggedIn, isOwner, upload.single("vlisting[image]"), wrapAsync(controller.update))
  .delete(isLoggedIn, isOwner, wrapAsync(controller.delete));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(controller.edit));

module.exports = router;
