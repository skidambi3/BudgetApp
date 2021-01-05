import logo from './logo.svg';
import './App.css';
import React, { useState, Component } from 'react';
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";
import ProgressBar from './ProgressBar.js';
import Calendar from './Calendar.js';
import LineChart from './Chart.js';
import { user1 } from './store.js';
import { startOfWeek, format, addDays, getTime } from 'date-fns'


//going to previous and next = add/subtract 7 days
//add currentFirstDay which use to determine what to render in that week
//only class should be purchase, day should be converted into a Date object
//checkboxes for each repetition day so attribute is an array not a string
//getDay returns 0-6 corresponding to M-S
//isEqual() compares date objects


// let formattedFirstDay = format(firstDay,' EEEEEE M/d');
// console.log(formattedFirstDay);
const findPurchaseTotal = (account, startOfWeek) => {
  let sum = 0;
  console.log(account);
  for (const purchase of account.purchases) {
    if (purchase.repetition.length > 0) {
      sum += purchase.repetition.length * purchase.price;
    }
    else if (getTime(purchase.day) >= getTime(startOfWeek) && getTime(purchase.day) < getTime(addDays(startOfWeek, 7)))
      sum += purchase.price;

  }
  return sum;
}

const findPriceDistribution = (account,startOfWeek) => {
  let prices = {}

    for (const purchase of account.purchases) {
      if (purchase.category in prices && (getTime(purchase.day) >= getTime(startOfWeek) && getTime(purchase.day) < getTime(addDays(startOfWeek, 7)))) {
        prices[purchase.category] += purchase.price;
      }
      else {
        prices[purchase.category] = purchase.price;
      }

    }

  return prices;
}

const generateDailyCosts = (account,startOfWeek) => {
  let cumulativeCost = 0;
  let budget = account.weeklyBudget;
  let days = ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  let dailyCosts = [budget, budget, budget, budget, budget, budget, budget];
  console.log(startOfWeek);
  for (let i = 0; i < 7; i++) {
    for (const purchase of account.purchases) {
      if (purchase.repetition.includes(days[i])) {
        cumulativeCost += purchase.price;
      }
      else if (format(purchase.day,'EEEEEE') === days[i] && (getTime(purchase.day) >= getTime(startOfWeek) && getTime(purchase.day) < getTime(addDays(startOfWeek, 7)))) {
        cumulativeCost += purchase.price;
      }

    }
    dailyCosts[i] -= cumulativeCost;
  }
  return dailyCosts
}

const statusMessage = (account, budget, categoryPrices,startOfWeek) => {
  if (findPurchaseTotal(account,startOfWeek) <= budget) {
    return "On Track!"
  }
  else {
    let maxCategory = "";
    let maxPrice = 0;
    for (const key in categoryPrices) {
      console.log(key);
      if (categoryPrices[key] > maxPrice) {
        maxCategory = key;
        maxPrice = categoryPrices[key]
      }
    }
    if (maxCategory === "") {
      return "No purchases made yet"
    }
    return "Projected to exceed budget. Consider reducing spending in: " + maxCategory;
  }
}

const parseRepetitions = (repetition, purchase) => {
  let dates = [];
  if (repetition === "no") {
    return repetition;
  }
  let startIndex = 0;
  for (let i = 0; i < repetition.length; i++) {
    if (repetition.substring(i, i + 1) === "/") {
      dates.push(repetition.substring(startIndex, i));
      startIndex = i + 1;
    }
  }
  dates.push(repetition.substring(repetition.length - 1, repetition.length));
  return dates;
}

const processRepetitions = (account) => {
  for (const purchase in account.purchases) {
    if (purchase.reptitions.length > 0) {

    }
  }
}

function App() {
  // let convertedWeek = processRepetitions(thisWeek);
  const [firstDay, setDate] = useState(startOfWeek(new Date()));
  const alterDate = (count) => {
    setDate(addDays(firstDay, count));
    console.log(addDays(firstDay, count))
  }
  const vals =  findPriceDistribution(user1,firstDay);

  return (

    <div className="App">

      <button onClick={() => alterDate(-7)}>Previous</button>
      My Dashboard
      <button onClick={() => alterDate(7)}>Next</button>
      <Calendar startDate={firstDay} />
      {/* TODO: grid layout from MDN guide for columns */}
      {format(firstDay, ' M/d')}
      <form >
        <label>
          Alter Weekly Budget:
          <input type="text" />
        </label>
        <input type="submit" value="Enter" />
      </form>
      <div class="wrapper">
        <div class="status-report">
          <h2>Status Report:</h2>
          <h3>You have Spent ${findPurchaseTotal(user1,firstDay)} Dollars</h3>

          <ProgressBar percentage={findPurchaseTotal(user1,firstDay) / user1.weeklyBudget * 100} />
          <h4>You are projected to spend {findPurchaseTotal(user1,firstDay) / user1.weeklyBudget * 100}% of your weekly budget</h4>
          <h5>Status: {statusMessage(user1, user1.weeklyBudget,vals,firstDay)}</h5>
          <div>
            {
              Object.keys(vals).map((key, index) => (
                <p key={index}> The {key} category has a cumulative total of ${vals[key]}</p>
              ))
            }
          </div>
        </div>
        <div class="visualizations">
          Visualizations
          <LineChart dailyCosts={generateDailyCosts(user1,firstDay)} />

        </div>

      </div>
      <button>
        Add a purchase!
      </button>

      <button>
        Sign Out
      </button>
    </div>


  );
}

export default App;
