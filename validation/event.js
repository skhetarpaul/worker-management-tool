const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEventInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.venue = !isEmpty(data.venue) ? data.venue : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.venue)) {
    errors.name = "Venue field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};