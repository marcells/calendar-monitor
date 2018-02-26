import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import CalendarList from './CalendarList';

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
        calendars: {
          items: [
            {
              id: 'calendar1',
              description: 'some description for calendar 1'
            },
            {
              id: 'calendar2',
              description: 'some description for calendar 2'
            }
          ]
        }
      });

      const result = renderer.create(
        <Provider store={store}>
          <MemoryRouter>
            <CalendarList />
          </MemoryRouter>
        </Provider>
      );

      expect(result).toMatchSnapshot();
    });
  });
});
