import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      name: "",
      email: "",
      editedData: false
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onCreateEventClick = () => {
    console.log(this.state)
    if(this.state.post=== 'Manager') {
      this.props.history.push('/create-manager/');
    }
    if(this.state.post=== 'Receptionist') {
      this.props.history.push('/create-receptionist/');
    }
    if(this.state.post=== 'Admin') {
      this.props.history.push('/create-admin/');
    }
    console.log("redirecting done")
  }
 
  onViewClick = () => {
    this.props.history.push('/view/');
    console.log("redirecting done")
  }
  async componentDidMount() {
    let user_id = this.props.auth.user.id
    console.log(user_id)
    let response = await axios.get(`/api/users/view-user?id=${user_id}`)
    const {post, name, email} = response.data
    console.log(post, name, email)
    this.setState({
      post, name, email
    })

  }
render() {
    const { user } = this.props.auth;
    

return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Welcome onboard,</b> {user.name.split(" ")[0]}
                <p className="flow-text blue-text text-darken-1">
                  You have registered yourself as a {this.state.post}<br/>
                  Be a better<span style={{ fontFamily: "monospace" }}>You!!</span>
                </p>
              </h4>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginRight: "2rem"
                }}
                onClick={this.onCreateEventClick} 
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                CREATE YOUR PROFILE
              </button>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginRight: "2rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
              
            </div>
          </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);