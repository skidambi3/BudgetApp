import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";
import ProgressBar from './ProgressBar.js';
import Calendar from './Calendar.js';
import LineChart from './Chart.js';
import { thisWeek, weeklyBudget } from './store.js';



const findPurchaseTotal = (week) => {
  let sum = 0;
  for (const date of week.dates) {
    for (const purchase of date.purchases) {
      sum += purchase.price;
    }
  }
  return sum;
}

const findPriceDistribution = (week) => {
  let prices = {}

  for (const date of week.dates) {
    for (const purchase of date.purchases) {
      if (purchase.category in prices) {
        prices[purchase.category] += purchase.price;
      }
      else {
        prices[purchase.category] = purchase.price;
      }

    }
  }
  return prices;
}

const generateDailyCosts = (week) => {
  let cumulativeCost = 0;
  let budget = weeklyBudget;
  let days = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];
  let dailyCosts = [budget, budget, budget, budget, budget, budget, budget];
  for (let i = 0; i < 7; i++) {
    for (const date of week.dates) {
      for (const purchase of date.purchases) {
        if (purchase.day == days[i]) {
          cumulativeCost += purchase.price
        }
      }
    }
    dailyCosts[i] -= cumulativeCost;
  }
  return dailyCosts
}

const statusMessage = (week, budget, categoryPrices) => {
  if (findPurchaseTotal(week) <= budget) {
    return "On Track!"
  }
  else {
    let maxCategory = "";
    let maxPrice = 0;
    console.log(categoryPrices);
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

function App() {
  const vals = findPriceDistribution(thisWeek);
  console.log(vals);
  return (

    <div className="App">

      My Dashboard

      <Calendar />
      {/* TODO: grid layout from MDN guide for columns */}

      <form >
        <label>
          Alter Weekly Budget:
          <input type="text"  />
        </label>
        <input type="submit" value="Enter" />
      </form>
      <div class="wrapper">
        <div class="status-report">
          <h2>Status Report:</h2>
          <h3>You've Spent ${findPurchaseTotal(thisWeek)} Dollars</h3>

          <ProgressBar percentage={findPurchaseTotal(thisWeek) / weeklyBudget * 100} />
          <h4>You're projected to spend {findPurchaseTotal(thisWeek) / weeklyBudget * 100}% of your weekly budget</h4>
          <h5>Status: {statusMessage(thisWeek, weeklyBudget, vals)}</h5>
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
          <LineChart dailyCosts={generateDailyCosts(thisWeek, weeklyBudget)} />

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
