const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const skillConroller = require("../Controllers/skill");

router
.route("/")
.get(wrapAsync(skillConroller.index))
.post(wrapAsync(skillConroller.update));

module.exports = router;