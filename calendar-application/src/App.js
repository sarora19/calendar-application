import React, { Component } from "react";
import "./App.css";
import moment from "moment";

var { Calendar, CalendarControls } = require("react-yearly-calendar");

class App extends Component {
  constructor(props) {
    super(props);
    const currentdate = moment();

    this.state = {
      year: currentdate.year(),
      showDaysOfWeek: true,
      showWeekSeparators: true,
      selectedDay: currentdate,
      loaded: false,
      items: []
    };
  }

  onPrevYear() {
    this.setState(prev => ({
      year: prev.year - 1
    }));
  }

  onNextYear() {
    this.setState(next => ({
      year: next.year + 1
    }));
  }

  goToToday() {
    var today = moment();
    this.setState({
      year: today.year(),
      selectedDay: today
    });
  }

  datePicked(date) {
    this.setState({
      selectedDay: date
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    var request = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: "selectedDate=" + this.state.selectedDay.format()
    };

    fetch("http://localhost:3001/api/setDate", request)
      .then(res => alert("Data saved successfully"))
      .catch(err => {
        // console.error("Request failed", err);
        alert("Request failed", err);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <CalendarControls
            year={this.state.year}
            showTodayButton={true}
            onPrevYear={() => this.onPrevYear()}
            onNextYear={() => this.onNextYear()}
            goToToday={() => this.goToToday()}
          />
          <Calendar
            year={this.state.year}
            selectedDay={this.state.selectedDay}
            onPickDate={date => this.datePicked(date)}
            showWeeksSeparator={this.state.showWeekSeparators}
          />
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

export default App;
