import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './js/app';
import CalendarUtils from './js/utils/calendar-utils';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Calendar />, div);
// });

describe('CalendarUtils', () => {
  describe('getEventsForDay', () => {
    it('returns all events for a given day', () => {
      const calendarUtils = new CalendarUtils([{
        startDate: 1497211200,    // June 11th, 2017, 3pm
        endDate: 1497222000,      // June 11th, 2017, 6pm
        title: 'Test Event',
        description: 'A really fun thing',
        location: 'Bennu Coffeeshop'
      }]);
      const date = new Date(2017, 5, 11).getTime() / 1000;
      const events = calendarUtils.getEventsForDay(date);

      expect(events.length).toEqual(1);
    });

    it('returns an empty array if there are no events', () => {
      const calendarUtils = new CalendarUtils([]);
      const date = new Date(2017, 0, 1).getTime() / 1000;
      const events = calendarUtils.getEventsForDay(date);

      expect(events.length).toEqual(0);
    });

    it('returns events that are only start or end on the given day', () => {
      const calendarUtils = new CalendarUtils([{
        startDate: 1497211200,    // June 11th, 2017, 3pm
        endDate: 1497222000,      // June 11th, 2017, 6pm
        title: 'First Event',
        description: 'A really fun thing',
        location: 'Bennu Coffeeshop'
      },{
        startDate: 1497146400,    // June 10th, 2017, 9pm
        endDate: 1497164400,      // June 11th, 2017, 2am
        title: 'Late Night Event',
        description: 'Drinks and pizza',
        location: 'Violet Crown Bar'
      },{
        startDate: 1497276000,    // June 12th, 2017, 9am
        endDate: 1497304800,      // June 12th, 2017, 5pm
        title: 'Work',
        description: 'Werkin werkin',
        location: 'TrendKite'
      },{
        startDate: 1497229200,    // June 11th, 2017, 8pm
        endDate: 1497247200,      // June 12th, 2017, 1am
        title: 'Movie Night',
        description: 'Movies and stuff',
        location: 'Kyrsten\'s House'
      }]);

      const date = new Date(2017, 5, 11).getTime() / 1000;
      const events = calendarUtils.getEventsForDay(date);

      expect(events.length).toEqual(3);
      expect(events[0].title = calendarUtils.eventInfo[0].title);
      expect(events[1].title = calendarUtils.eventInfo[1].title);
      expect(events[2].title = calendarUtils.eventInfo[3].title);
    });
  });
});
