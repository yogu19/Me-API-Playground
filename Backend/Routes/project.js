const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const projectConroller = require("../Controllers/project");

router
.route("/")
.get(wrapAsync(projectConroller.index))
.post(wrapAsync(projectConroller.add));

module.exports = router;