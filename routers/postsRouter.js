const express = require("express");
const router = express.Router();
const { body, checkSchema } = require("express-validator");
const postController = require("../controllers/postController");
const postUpdate = require("../validations/postUpdate");
const schermaValidator = require("../middlwares/schemaValidator");

// INDEX
router.get("/", postController.index);

// SHOW (SLUG)
router.get("/:slug", postController.show);

// STORE
router.post(
  "/",
  body("title").notEmpty().isString(),
  body("image").notEmpty().isString(),
  body("content").notEmpty().isString(),
  body("published").isBoolean().optional(),
  postController.store
);

// UPDATE
router.put(
  "/:slug",
  checkSchema(postUpdate),
  schermaValidator.checkValidity,
  postController.update
);

// DELETE
router.delete("/:slug", postController.destroy);

module.exports = router;
