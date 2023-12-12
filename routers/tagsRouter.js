const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

router.get("/", tagController.index);

router.post("/", tagController.store);

module.exports = router;
