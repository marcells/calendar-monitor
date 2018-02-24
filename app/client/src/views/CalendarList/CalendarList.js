import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { loadCalendars } from '../../redux/actions';

class CalendarList extends Component {
  async componentDidMount() {
    this.props.dispatch(loadCalendars());
  }

  render() {
    return (
      <ul>
        {this.props.items.map(x => <li key={x.id}><Link to={`/calendar/${x.id}`}>{x.description}</Link></li>)}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  const { items } = state.calendars;

  return {
    items
  };
}

export default connect(mapStateToProps)(CalendarList);
