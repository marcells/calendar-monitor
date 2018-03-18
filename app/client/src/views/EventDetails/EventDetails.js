import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { closeEventDetails } from '../../redux/actions';
import './EventDetails.css';

class EventDetails extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <div className="Title">
          <span>Event-Details</span>
        </div>

        <div className="Properties">
          <span>Id</span>
          <span>{this.props.event.id}</span>

          <span>Id</span>
          <span>{this.props.event.id}</span>

          <span>Id</span>
          <span>{this.props.event.id}</span>
        </div>

        <div className="Actions">
          <button onClick={() => this.props.dispatch(closeEventDetails()) }>Close</button>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { event, isOpen } = state.eventDetails;

  return {
    isOpen,
    event
  };
}

export default connect(mapStateToProps)(EventDetails);
