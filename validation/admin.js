const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAdminInput(data) {
  let errors = {};

  data.age = !isEmpty(data.age) ? data.age : "";
  data.previousExperienceYears = !isEmpty(data.applicatiopreviousExperienceYears) ? data.previousExperienceYears : "";
  data.reason = !isEmpty(data.reason) ? data.reason : "";


  if (Validator.isEmpty(data.age)) {
    errors.name = "This field is required";
  }
  if (data.age < 20 || data.age>100) {
    errors.age = "Value must range between2- to 100 for age";
  }
  if (Validator.isEmpty(data.previousExperienceYears)) {
    errors.previousExperienceYears = "This field is required";
  }

  if (Validator.isEmpty(data.reason)) {
    errors.reason = "This field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};