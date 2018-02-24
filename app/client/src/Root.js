import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import CalendarApp from './views/CalendarApp/CalendarApp';
import CalendarList from './views/CalendarList/CalendarList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Root.css';
 
const store = configureStore()

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="Root">
            <Route exact={true} path="/" component={Welcome} />
            <Route path="/calendar/:calendar" component={CalendarView} />
          </div>
        </Router>
      </Provider>
    );
  }
}

const Welcome = () => (
  <div>
    <div>Welcome!</div>
    <CalendarList />
  </div>
);

const CalendarView = ({ match }) => (
  <CalendarApp calendar={match.params.calendar} />
);

export default Root;
