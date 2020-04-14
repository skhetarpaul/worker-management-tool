import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {registerReceptionist} from "../../actions/authActions";
import classnames from "classnames";
import Select , {components} from 'react-select'

class CreateReceptionist extends Component {
  constructor(props) {
    super(props);
    let userId = props.auth.user.id
    this.state = {
      id: userId,
      previousExperienceYears: 0,
      age: 0,
      location: "",
      errors: {}
    };
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

handleSelectChange = e => {
    this.setState({application: e.value })
}

onSubmit = e => {
    e.preventDefault();
const newUser = {
    previousExperienceYears: this.state.previousExperienceYears,
      age: this.state.age,
    location: this.state.location
    };
this.props.registerReceptionist(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Let us know you Better</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.age}
                  error={errors.age}
                  id="age"
                  type="number"
                  className={classnames("", {
                    invalid: errors.age
                  })}
                />
                <label htmlFor="age">What is your age?</label>
                <span className="red-text">{errors.age}</span>
              </div>
              <div className="input-field col s12">
              <input
                  onChange={this.onChange}
                  value={this.state.previousExperienceYears}
                  error={errors.previousExperienceYears}
                  id="previousExperienceYears"
                  type="number"
                  className={classnames("", {
                    invalid: errors.previousExperienceYears
                  })}
                />
                <label htmlFor="age">What is your experience in years?</label>
                <span className="red-text">{errors.previousExperienceYears}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.location}
                  error={errors.location}
                  id="location"
                  type="text"
                  className={classnames("", {
                    invalid: errors.location
                  })}
                />
                <label htmlFor="location">Tell us about your location</label>
                <span className="red-text">{errors.location}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Make your Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CreateReceptionist.propTypes = {
  registerReceptionist: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerReceptionist }
)(withRouter(CreateReceptionist));