const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateManagerInput(data) {
  let errors = {};

  data.noOfProjects = !isEmpty(data.noOfProjects) ? data.noOfProjects : "";
  data.application = !isEmpty(data.application) ? data.application : "";
  data.location = !isEmpty(data.location) ? data.location : "";


  if (Validator.isEmpty(data.noOfProjects)) {
    errors.name = "This field is required";
  }
  if (data.noOfProjects > 10 || data.noOfProjects<0) {
    errors.noOfProjects = "Value must range between 1 to 10 for number of projects";
  }
  if (Validator.isEmpty(data.application)) {
    errors.application = "This field is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "This field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};