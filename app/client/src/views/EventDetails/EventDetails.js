import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Linkify from 'react-linkify';
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
  _renderDescription() {
    return (
      <React.Fragment>
        <span><FontAwesomeIcon icon={faAlignJustify} /></span>
        <Linkify className="EventDetails-Description" properties={{ target: '_blank' }}>{this.props.event.description}</Linkify>
      </ React.Fragment>
    );
  }

  _renderTags() {
    return (
      <React.Fragment>
        <span><FontAwesomeIcon icon={faTags} /></span>
        <div className="EventDetails-Tags">{this.props.event.tags.map(x => <Tag key={x.name} data={x} />)}</div>
      </ React.Fragment>
    );
  }

  _renderLocation() {
    return (
      <React.Fragment>
        <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
        <a className="EventDetails-Location" href={`https://maps.google.com?q=${encodeURIComponent(this.props.event.location)}`} target="blank">{this.props.event.location}</a>
      </React.Fragment>
    );
  }

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
          <span>{moment(this.props.event.from).format('LLLL')} - {moment(this.props.event.to).format('LT')}</span>

          { this.props.event.location ? this._renderLocation() : null }
          { this.props.event.description ? this._renderDescription() : null }
          { this.props.event.tags ? this._renderTags() : null }

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
