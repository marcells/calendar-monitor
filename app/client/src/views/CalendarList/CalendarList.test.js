import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import CalendarList from './CalendarList';

const mockedDispatch = jest.fn();

describe('CalendarList', () => {
  describe('has items', () => {
    it('should render calendar items correctly', () => {
      const items = [
        {
          id: 'calendar1',
          description: 'some description for calendar 1'
        },
        {
          id: 'calendar2',
          description: 'some description for calendar 2'
        }
      ];

      const renderer = new ShallowRenderer();
      const result = renderer.render(<CalendarList.WrappedComponent dispatch={mockedDispatch} items={items} />);

      expect(result).toMatchSnapshot();
    });
  });

  describe('has no items', () => {
    it('should render calendar items correctly', () => {
      const renderer = new ShallowRenderer();
      const result = renderer.render(<CalendarList.WrappedComponent dispatch={mockedDispatch} items={[]} />);

      expect(result).toMatchSnapshot();
    });

    it('should render an empty unordered list', () => {
      const wrapper = shallow(<CalendarList.WrappedComponent dispatch={mockedDispatch} items={[]} />);

      expect(wrapper.find('ul')).toHaveLength(1);
      expect(wrapper.find('li')).toHaveLength(0);
    });
  });
});
