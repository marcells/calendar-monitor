import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CalendarList extends Component {
    constructor() {
        super();

        this.state = { calendars: [] };
    }

    async componentDidMount() {
        const calendars = await axios.get('/api/calendars');

        this.setState({ calendars: calendars.data.calendars });
    }

    render() {
        return (
            <ul>
                { this.state.calendars.map(x => <li key={x.id}><Link to={`/calendar/${x.id}`}>{x.description}</Link></li> )}
            </ul>
        );
    }
}

export default CalendarList;