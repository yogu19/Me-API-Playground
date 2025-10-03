const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const profileConroller = require("../Controllers/profile");

router
.route("/")
.get(wrapAsync(profileConroller.index))
.post(wrapAsync(profileConroller.update));

module.exports = router;