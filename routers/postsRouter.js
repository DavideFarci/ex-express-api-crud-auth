const express = require("express");
const router = express.Router();
const path = require("path");
const { body, checkSchema } = require("express-validator");
const postController = require("../controllers/postController");
const postUpdate = require("../validations/postUpdate");
const schemaValidator = require("../middlwares/schemaValidator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// INDEX
router.get("/", postController.index);

// SHOW (SLUG)
router.get("/:slug", postController.show);

// STORE
router.post(
  "/",
  multer({ storage: storage }).single("image"),
  body("title").notEmpty().isString(),
  body("image").optional(),
  body("content").notEmpty().isString(),
  body("published").isBoolean().optional().toBoolean(),
  postController.store
);

// UPDATE
router.put(
  "/:slug",
  multer({ storage: storage }).single("image"),
  checkSchema(postUpdate),
  schemaValidator.checkValidity,
  postController.update
);

// DELETE
router.delete("/:slug", postController.destroy);

module.exports = router;
