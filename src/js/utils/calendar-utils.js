import moment from 'moment';
import calendarData from '../../data/calendar-data';

const WEEK_DATA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class CalendarUtils {
  constructor(eventInfo) {
    this.eventInfo = eventInfo || [];
  }

  getMonthName(index) {
    return calendarData[index].name;
  }

  getEventsForDay(date) {
    let events = [];
    const givenDate = moment.unix(date).format('MM-DD-YYYY');
    this.eventInfo.forEach(function(event) {
      const startDate = moment.unix(event.startDate).format('MM-DD-YYYY');
      const endDate =  moment.unix(event.endDate).format('MM-DD-YYYY');
      if (moment(givenDate).isSame(startDate, 'day') || moment(givenDate).isSame(endDate, 'day')) {
        events.push(event);
      }
    });
    return events;
  }

  getRowData(currentDate) {
    const currentMonth = moment(currentDate).month();
    const startOfMonth = moment(currentDate).startOf('month').format('dddd');
    const startOfWeek = WEEK_DATA.indexOf(startOfMonth);
    const that = this;
    let rows = [];
    let newRow = [];
    calendarData.forEach(function(month, i) {
      if (that.getMonthName(currentMonth) === month.name) {
        let prevDays = 0;
        const prevMonth = calendarData[(i + 11) % 12];
        while (prevDays < startOfWeek) {
          newRow.push({
            date: moment(`${i}/${prevMonth.days - (startOfWeek - prevDays) + 1}/2017`),
            day: prevMonth.days - (startOfWeek - prevDays) + 1,
            key: -prevDays,
          });
          prevDays++;
        }
        for (let j = 1; j <= month.days; j++) {
          let day = {
            date: moment(`${i + 1}/${j}/2017`),
            day: j,
            key: j,
          };
          day.events = that.getEventsForDay(day.date);

          if (newRow.length === 7) {
            rows.push(newRow);
            newRow = [];
          }
          newRow.push(day);
          if (j === month.days) {
            var key = j;
            while (newRow.length < 7) {
              key++;
              newRow.push({
                date: moment(`${i}/${key - month.days}/2017`),
                day: key - month.days,
                key: key,
              });
            }
            rows.push(newRow);
          }
        }
      }
    });

    return rows;
  }
}

module.exports = CalendarUtils;
