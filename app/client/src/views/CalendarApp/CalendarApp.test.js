import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import CalendarApp from './CalendarApp';

describe('CalendarApp', () => {
  describe('auto refresh', () => {
    it('will be disabled when unmounted', () => {
      jest.useFakeTimers();

      const mockedDispatch = jest.fn();
      const wrapper = shallow(<CalendarApp.WrappedComponent dispatch={mockedDispatch} calendarId="test" calendars={[]} upcoming={[]} />);
      wrapper.unmount();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    it('will be triggered automatically', () => {
      jest.useFakeTimers();

      const mockedDispatch = jest.fn();
      const wrapper = shallow(<CalendarApp.WrappedComponent dispatch={mockedDispatch} calendarId="test" calendars={[]} upcoming={[]} />);
      jest.runOnlyPendingTimers();
      wrapper.unmount();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });
  });

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

      const mockedDispatch = jest.fn();
      const renderer = new ShallowRenderer();
      const result = renderer.render(<CalendarApp.WrappedComponent dispatch={mockedDispatch} calendarId="test" calendars={calendars} upcoming={upcoming} />);

      expect(result).toMatchSnapshot();
    });
  });

  describe('has no calendars', () => {
    it('should render calendar items correctly', () => {
      const mockedDispatch = jest.fn();
      const renderer = new ShallowRenderer();
      const result = renderer.render(<CalendarApp.WrappedComponent dispatch={mockedDispatch} calendarId="test" calendars={[]} upcoming={[]} />);

      expect(result).toMatchSnapshot();
    });

    it('should render an empty unordered list', () => {
      const mockedDispatch = jest.fn();
      const wrapper = shallow(<CalendarApp.WrappedComponent dispatch={mockedDispatch} calendarId="test" calendars={[]} upcoming={[]} />);

      expect(wrapper.find('Connect(Calendar)')).toHaveLength(0);
      expect(wrapper.find('Connect(Upcoming)')).toHaveLength(1);
      expect(wrapper.find('Connect(EventDetails)')).toHaveLength(1);
    });
  });
});
