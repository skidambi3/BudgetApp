import React from 'react';

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
  constructor(name, price, category, day, repetition) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.day = day;
    this.repetition = repetition;
  }
}

let wed1 = new Purchase("Grapes", 3, "Food", "W", "No");
let fri1 = new Purchase("Pizza", 7.5, "Food", "F", "M/W/F");
let wed2 = new Purchase("Calculator", 20, "School", "W", "M/W");

let wed = new Date("W", [wed1, wed2]);
let fri = new Date("F", [fri1]);

let thisWeek = new Week([wed, fri]);
let weeklyBudget = 30;
export { thisWeek, weeklyBudget };
