import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import { closeEventDetails } from '../../redux/actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import faAlignJustify from '@fortawesome/fontawesome-free-solid/faAlignJustify'
import faTags from '@fortawesome/fontawesome-free-solid/faTags'
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt'
import './EventDetails.css';

const Tag = props => (
  <span style={ { backgroundColor: props.data.properties.backgroundColor, color: props.data.properties.foregroundColor } }>{props.data.name}</span>
);

class EventDetails extends Component {
  render() {
    const customStyles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (
      <Modal isOpen={this.props.isOpen} style={customStyles}>
        <div className="EventDetails-Header">
          <span>Event-Details</span>
        </div>

        <div className="EventDetails-Properties">
          <span><FontAwesomeIcon icon={faCalendarAlt} /></span>
          <span className="EventDetails-Title">{this.props.event.title}</span>

          <span><FontAwesomeIcon icon={faClock} /></span>
          <span>{moment(this.props.event.from).format('L LT')} - {moment(this.props.event.to).format('L LT')}</span>

          <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
          <a className="EventDetails-Location" href={`https://maps.google.com?q=${encodeURIComponent(this.props.event.location)}`} target="blank">{this.props.event.location}</a>

          <span><FontAwesomeIcon icon={faAlignJustify} /></span>
          <div className="EventDetails-Description">{this.props.event.description}</div>

          <span><FontAwesomeIcon icon={faTags} /></span>
          <div className="EventDetails-Tags">{this.props.event.tags.map(x => <Tag key={x.name} data={x} />)}</div>
        </div>

        <div className="EventDetails-Actions">
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
