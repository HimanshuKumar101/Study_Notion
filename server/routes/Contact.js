const express = require("express");
const router = express.Router();
const { contactUsController } = require("../controllers/ContactUs");

router.post("/contact", contactUsController);  // This defines the route "/contact"

module.exports = router;
