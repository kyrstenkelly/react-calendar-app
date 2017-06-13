import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Modal from 'boron/DropModal';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class EventModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null
    };
  }

  show(date) {
    const startDate = date ? moment(date).add(12, 'hours') : moment().add(12, 'hours');
    const endDate = moment(startDate).add(1, 'hours')
    this.setState({
      startDate: startDate,
      endDate: endDate,
    });

    this.refs.modal.show();
  }

  hide() {
    this.refs.modal.hide();
  }

  save() {
    // TODO: save dates
  }

  startDateChange(newDate) {
    this.setState({
      startDate: newDate
    });
  }

  endDateChange(newDate) {
    this.setState({
      endDate: newDate
    });
  }

  render() {
    return (
      <Modal ref="modal" className="modal">
        <h2>Add an event</h2>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.startDateChange.bind(this)}
          placeholderText="Select a start date"
        /><br/>
        <DatePicker
          selected={this.state.endDate}
          onChange={this.endDateChange.bind(this)}
          placeholderText="Select a end date"
        />
        <br/>
        <button onClick={this.save}>Save</button>
        <button onClick={this.hide.bind(this)}>Close</button>
     </Modal>
    );
  }
}

module.exports = EventModal;
