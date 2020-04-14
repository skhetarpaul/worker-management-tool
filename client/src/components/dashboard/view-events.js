import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { viewEvent } from "../../actions/authActions";
import classnames from "classnames";
import {MdDelete} from "react-icons/md";
import axios from 'axios'

export default class ViewEvent extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      errors: {}
    };
  }

// componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
// }
componentDidMount() {
    axios.get("/api/users/view")
        .then(response => {
            this.setState({ events: response.data });
            console.log(this.state.events) 
        })
        .catch(function (error){
            console.log(error);
        })
}
deleteEvent(index) {
  console.log(index); 
  this.setState(prevState => {
    const events = prevState.events.filter((event, i) => i != index);

    return {events};
  })
}

render() {
    const { errors } = this.state;
    return (
        <div>
            <br/>
            <h2 class="blue-text">Events Scheduled soon!!</h2> 
            <br/>
            <br/>
           {this.state.events.map((event, index) => (
              <h4 class="grey-text">{event.name} is scheduled at {event.venue} !<MdDelete onClick = {this.deleteEvent.bind(this, index)}/><br/><br/></h4> 
              // <br/>
            ))}
        </div> 
    )
  }
}
// CreateEvent.propTypes = {
//   registerEvent: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
