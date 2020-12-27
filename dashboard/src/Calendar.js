import React, {Component} from 'react';
import './Calendar.css';
import {thisWeek} from './store.js';



const returnPurchaseInfo = (day,week) => {
  let purchases = [];
  for (const date of week.dates) {
    if (date.day === day) {
      for (const purchase of date.purchases) {
        purchases.push(<li class = "purchase-item">{purchase.name} : ${purchase.price}</li>)
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
          {returnPurchaseInfo("W",thisWeek)}
        </div>
        <div class = "date">
          Thursday
        </div>
        <div class = "date">
          Friday
          {returnPurchaseInfo("F",thisWeek)}

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