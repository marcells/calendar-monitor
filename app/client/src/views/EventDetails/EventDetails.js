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
import './EventDetails.css';

const Tag = props => (
  <span style={ { backgroundColor: props.data.properties.backgroundColor, color: props.data.properties.foregroundColor } }>{props.data.name}</span>
);

class EventDetails extends Component {
  render() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return (
      <Modal isOpen={this.props.isOpen} style={customStyles}>
        <div className="Title">
          <span>Event-Details</span>
        </div>

        <div className="Properties">
          <span><FontAwesomeIcon icon={faCalendarAlt} /></span>
          <span>{this.props.event.title}</span>

          <span><FontAwesomeIcon icon={faClock} /></span>
          <span>{moment(this.props.event.from).format('L LT')} - {moment(this.props.event.to).format('L LT')}</span>

          <span><FontAwesomeIcon icon={faAlignJustify} /></span>
          <div>{this.props.event.description}</div>

          <span><FontAwesomeIcon icon={faTags} /></span>
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
