const {
  validationResult,
  matchedData,
  checkSchema,
} = require("express-validator");

function checkValidity(req, res, next) {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.status(422).json(validation.array());
  }

  req.validateData = matchedData(req);

  next();
}

module.exports = function (schema) {
  return [checkSchema(schema), checkValidity];
};

module.exports.checkValidity = checkValidity;
