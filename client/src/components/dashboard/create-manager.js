import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {registerManager} from "../../actions/authActions";
import classnames from "classnames";
import Select , {components} from 'react-select'

class CreateManager extends Component {
  constructor(props) {
    super(props);
    let userId = props.auth.user.id
    this.state = {
      id: userId,
      noOfProjects: 0,
      application: "",
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
      noOfProjects: this.state.noOfProjects,
      application: this.state.application,
    location: this.state.location
    };
this.props.registerManager(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
    const options = [
      {value: "Product", label: "Product"},
      {value: "Operations", label: "Operations"}
    ]
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '2px dotted blue',
        color: state.application ? 'yellow': 'black',
        backgroundColor: state.application? 'blue':'white'
      }),
      control: (provided) => ({
        ...provided,
        marginTop: "5%"
      })
    }
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
                  value={this.state.noOfProjects}
                  error={errors.noOfProjects}
                  id="noOfProjects"
                  type="number"
                  className={classnames("", {
                    invalid: errors.noOfProjects
                  })}
                />
                <label htmlFor="noOfProjects">How uch projects have you done??</label>
                <span className="red-text">{errors.noOfProjects}</span>
              </div>

              <div className="input-field col s12">
                <Select 
                    id="application"
                    isMulti= {false}
                    name="application"
                    placeholder="Which application of manager?"
                    options={options}
                    styles={customStyles}
                    onChange = {this.handleSelectChange}
                />
                <span className="red-text">{errors.application}</span>
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
CreateManager.propTypes = {
  registerManager: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerManager }
)(withRouter(CreateManager));