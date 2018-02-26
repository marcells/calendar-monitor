import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import CalendarApp from './CalendarApp';

describe('CalendarList', () => {
  describe('integration', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should render the calendars correctly', () => {
      const mockStore = configureStore([thunk]);
      const store = mockStore({
        calendar: {
          calendars: [
            {
              date: {
                month: 0,
                year: 2018
              },
              events: [{
                id: 'calendar1/1',
                title: 'Entry 1',
                from: new Date(2018, 0, 1, 17, 0, 0),
                to: new Date(2018, 0, 1, 19, 0, 0)
              },
              {
                id: 'calendar1/2',
                title: 'Entry 2',
                from: new Date(2018, 0, 18, 7, 0, 0),
                to: new Date(2018, 0, 18, 10, 0, 0)
              }]
            },
            {
              date: {
                month: 1,
                year: 2018
              },
              events: []
            }
          ],
          upcoming: [{
            id: 'calendar1/1',
            title: 'Entry 1',
            from: new Date(2018, 0, 1, 17, 0, 0),
            to: new Date(2018, 0, 1, 19, 0, 0)
          },
          {
            id: 'calendar1/2',
            title: 'Entry 2',
            from: new Date(2018, 0, 18, 7, 0, 0),
            to: new Date(2018, 0, 18, 10, 0, 0)
          }]
        }
      });

      const result = renderer.create(
        <Provider store={store}>
          <CalendarApp calendar='calendar1' />
        </Provider>
      );

      expect(result).toMatchSnapshot();
    });
  });
});