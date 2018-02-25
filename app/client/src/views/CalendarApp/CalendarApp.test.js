import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import CalendarApp from './CalendarApp';

const mockedDispatch = jest.fn();

describe('CalendarApp', () => {
  describe('has calendars', () => {
    it('should render calendar items correctly', () => {
      const calendars = [
        {
          date: {
            year: 2018,
            month: 0
          }
        },
        {
          date: {
            year: 2018,
            month: 1
          }
        }
      ];

      const upcoming = [
        {
          id: 1,
          title: 'Event 1'
        }
      ]

      const renderer = new ShallowRenderer();
      const result = renderer.render(<CalendarApp.WrappedComponent dispatch={mockedDispatch} calendarId="test" calendars={calendars} upcoming={upcoming} />);

      expect(result).toMatchSnapshot();
    });
  });

  describe('has no calendars', () => {
    it('should render calendar items correctly', () => {
      const renderer = new ShallowRenderer();
      const result = renderer.render(<CalendarApp.WrappedComponent dispatch={mockedDispatch} calendarId="test" calendars={[]} upcoming={[]} />);

      expect(result).toMatchSnapshot();
    });

    it('should render an empty unordered list', () => {
      const wrapper = shallow(<CalendarApp.WrappedComponent dispatch={mockedDispatch} calendarId="test" calendars={[]} upcoming={[]} />);

      expect(wrapper.find('Calendar')).toHaveLength(0);
      expect(wrapper.find('Upcoming')).toHaveLength(1);
    });
  });
});
