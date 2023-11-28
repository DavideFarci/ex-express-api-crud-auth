const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

//INDEX
router.get("/", categoryController.index);
// STORE
router.post("/", categoryController.store);

module.exports = router;
