import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './redux/configureStore';
import CalendarApp from './views/CalendarApp/CalendarApp';
import CalendarList from './views/CalendarList/CalendarList';
import './Root.css';
 
const store = configureStore()

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="Root">
            <Route exact={true} path="/" component={Welcome} />
            <Route path="/calendar/:calendar" component={Calendar} />
          </div>
        </Router>
      </Provider>
    );
  }
}

const Welcome = () => (
  <div>
    <h1>Choose your calendar</h1>
    <CalendarList />
  </div>
);

const Calendar = ({ match }) => (
  <CalendarApp calendar={match.params.calendar} />
);

export default Root;
