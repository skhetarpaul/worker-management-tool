import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {registerAdmin} from "../../actions/authActions";
import classnames from "classnames";
import Select , {components} from 'react-select'

class CreateAdmin extends Component {
  constructor(props) {
    super(props);
    let userId = props.auth.user.id
    this.state = {
      id: userId,
      age: 0,
      previousExperienceYears: 0,
      reason: "",
      errors: {}
    };
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

// handleSelectChange = e => {
//     this.setState({application: e.value })
// }

onSubmit = e => {
    e.preventDefault();
const newUser = {
      age: this.state.age,
      application: this.state.application,
    reason: this.state.reason
    };
this.props.registerAdmin(newUser, this.props.history); 
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
                  value={this.state.reason}
                  error={errors.reason}
                  id="reason"
                  type="text"
                  className={classnames("", {
                    invalid: errors.reason
                  })}
                />
                <label htmlFor="reason">Tell us about your reason</label>
                <span className="red-text">{errors.reason}</span>
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
CreateAdmin.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerAdmin }
)(withRouter(CreateAdmin));