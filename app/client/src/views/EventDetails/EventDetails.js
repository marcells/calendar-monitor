import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import { closeEventDetails } from '../../redux/actions';
import './EventDetails.css';

const Tag = props => (
  <span style={ { backgroundColor: props.data.properties.backgroundColor, color: props.data.properties.foregroundColor } }>{props.data.name}</span>
);

class EventDetails extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <div className="Title">
          <span>Event-Details</span>
        </div>

        <div className="Properties">
          <span>Title</span>
          <span>{this.props.event.title}</span>

          <span>Time</span>
          <span>{moment(this.props.event.from).format('L LT')} - {moment(this.props.event.to).format('L LT')}</span>

          <span>Description</span>
          <div>{this.props.event.description}</div>

          <span>Tags</span>
          <div className="Tags">{this.props.event.tags.map(x => <Tag key={x.name} data={x} />)}</div>
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
