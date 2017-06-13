import React, { Component } from 'react';
import moment from 'moment';
import EventModal from './event-modal';
import CalendarUtils from './utils/calendar-utils';
import eventData from '../data/event-data';
import '../app.css';

const calendarUtils = new CalendarUtils(eventData);

function Day(props) {
  let classNames = props.breakAfter ? "day break" : "day";
  let events = [];
  if (props.value && props.value.events) {
    events = props.value.events.map((event) =>
      <div className="event" key={event.title}>{event.title}</div>
    );
  }

  if (props.currentDate.startOf('day').isSame(props.value.date.startOf('day'))) {
    classNames += " selected";
  }

  return (
    <div
      className={classNames} key={props.value}
      onClick={() => props.clickHandler(props.value.date)}
    >
      {props.value.day}
      <div>
        {events}
      </div>
    </div>
  );
}

function Row(props) {
  const days = props.days.map((day) =>
    <Day key={day.key} value={day} {...props} />
  );

  return (
    <div className="row" key={props.index}>
      {days}
    </div>
  );
}

function EventButton(props) {
  return (
    <button className="add-event" onClick={props.clickHandler}>+</button>
  );
}

function TitleBar(props) {
  return (
    <div className="title">
      <button onClick={props.previousMonthHandler}>&lt;</button>
      &nbsp;{props.currentMonth}&nbsp;
      <button onClick={props.nextMonthHandler}>&gt;</button>
    </div>
  );
}

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state ={
      currentDate: moment()
    };
  }

  callback(date) {
    console.log(date);
  }

  setDate(date) {
    this.setState({
      currentDate: date,
      currentMonth: moment(date).month(),
      lastClickedDate: null
    });
  }

  previousMonth() {
    const prevMonth = moment(this.state.currentDate).subtract(1, 'month');
    this.setDate(prevMonth);
  }

  nextMonth() {
    const nextMonth = moment(this.state.currentDate).add(1, 'month');
    this.setDate(nextMonth);
  }

  handleDayClick(date, eventModal) {
    let clickedDate = moment(date);
    let clicks = 1;
    if (this.state.lastClickedDate) {
      if (clickedDate.startOf('day').isSame(this.state.lastClickedDate.startOf('day'))) {
        clicks++;
      }
    }
    this.setState({
      currentDate: date,
      lastClickedDate: date,
    });
    if (clicks > 1) {
      eventModal.show(date);
    }
  }

  render() {
    const rows = calendarUtils.getRowData(this.state.currentDate);
    const currentMonth = calendarUtils.getMonthName(this.state.currentDate.month());
    const rowItems = rows.map((days, i) =>
      <Row
        days={days} key={i} index={i} currentDate={this.state.currentDate}
        clickHandler={(date) => this.handleDayClick(date, this.refs.eventModal)}
      />
    );

    return (
      <div className="calendar">
        <div className="title-bar">
          <TitleBar
            nextMonthHandler={this.nextMonth.bind(this)}
            previousMonthHandler={this.previousMonth.bind(this)}
            currentMonth={currentMonth}
          />
          <EventButton clickHandler={() => this.refs.eventModal.show(this.state.currentDate)}/>
        </div>
        <div className="rows">{ rowItems }</div>
        <EventModal
          ref="eventModal"
          startDate={this.state.currentDate}
          callback={this.callback.bind(this)}
        />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <section>
        <Calendar></Calendar>
      </section>
    )
  }
}

export default App;
