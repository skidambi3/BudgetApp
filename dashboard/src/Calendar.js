import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar} from "daypilot-pro-react";

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


const returnPurchaseName = (day,week) => {
  let purchases = [];
  for (const date of week.dates) {
    if (date.day === day) {
      for (const purchase of date.purchases) {
        purchases.push(<li>{purchase.name}</li>)
        parseRepetitions(purchase.repetition,purchase);
      }
    }
  }
  return purchases
}

const parseRepetitions = (repetition,purchase) => {
  let dates = [];
  if (repetition === "no") {
    return repetition;
  }
  let startIndex = 0;
  for (let i = 0; i < repetition.length; i++) {
    if (repetition.substring(i,i+1) === "/") {
      dates.push(repetition.substring(startIndex,i));
      startIndex = i+1;
    }
  }
  dates.push(repetition.substring(repetition.length-1,repetition.length));
  console.log(dates);
}

class Calendar extends Component {

  render() {

    return (
      <div class = "weekly-calendar">
        <div class = "date">
          Monday
        </div>
        <div class = "date">
          Tuesday
        </div>
        <div class = "date">
          Wednesday
          {returnPurchaseName("W",thisWeek)}
        </div>
        <div class = "date">
          Thursday
        </div>
        <div class = "date">
          Friday
          {returnPurchaseName("F",thisWeek)}

        </div>
        <div class = "date">
          Saturday
        </div>
        <div class = "date">
          Sunday
        </div>
      </div>
    );
  }
}

export default Calendar;