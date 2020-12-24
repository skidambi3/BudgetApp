import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import {DayPilot, DayPilotCalendar} from "daypilot-pro-react";
import ProgressBar from './ProgressBar.js';
import Report from './Report.js';
import Calendar from './Calendar.js';
// class Calendar extends Component {

//   render() {
//     return (
//       <div>
//         <DayPilotCalendar />
//       </div>
//     );
//   }
// }

// export default Calendar;

class Week {
  constructor(dates) {
    this.dates = dates;
  }

}
class Date {
  constructor(day, purchases) {
    this.day = day;
    this.purchases = purchases;
  }
}
class Purchase {
  constructor(name,price,category,day,repetition) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.day = day;
    this.repetition = repetition;
  }
}

let wed1 = new Purchase("Grapes",3,"Food","W","No");
let fri1 =  new Purchase("Pizza",7.5,"Food","F","M/W/F");
let wed2 =  new Purchase("Calculator",20,"School","W","M/W");

let wed = new Date("W",[wed1,wed2]);
let fri = new Date("F",[fri1]);


let thisWeek = new Week([wed,fri]);

const findPurchaseTotal = (week) => {
  let sum = 0;
  for (const date of week.dates) {
    for (const purchase of date.purchases) {
      sum += purchase.price;
    }
  }
  return sum;
}

function App() {
  return (
    <div className="App">
      My Dashboard

      <Calendar />
      {/* TODO: grid layout from MDN guide for columns */}

      <button>
        Add a purchase!
      </button>
      <button>
        Create visualizations!
      </button>
      <button>
        Sign Out
      </button>
      <div class = "wrapper">
        <div class = "status-report">
          <h2>Status Report:</h2>
          <h3>You've Spent ${findPurchaseTotal(thisWeek)} Dollars</h3>
          <ProgressBar/>
        </div>
        <div class = "visualizations">
          Visualizations
          <Report/>
        </div>

      </div>
    </div>


  );
}

export default App;
