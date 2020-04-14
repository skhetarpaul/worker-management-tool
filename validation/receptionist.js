const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateReceptionistInput(data) {
  let errors = {};

  data.age = !isEmpty(data.age) ? data.age : "";
  data.previousExperienceYears = !isEmpty(data.previousExperienceYears) ? data.previousExperienceYears : "";
  data.location = !isEmpty(data.location) ? data.location : "";
location
  if (Validator.isEmpty(data.age)) {
    errors.name = "age field is required";
  }

  if (Validator.isEmpty(data.previousExperienceYears)) {
    errors.name = "previousExperienceYears field is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.name = "location field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};