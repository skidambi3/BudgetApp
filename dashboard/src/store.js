import React from 'react';
import { startOfWeek,format,addDays,isEqual } from 'date-fns'

class Week {
  constructor(dates) {
    this.dates = dates;
  }
}

class Day {
  constructor(day, purchases) {
    this.day = day;
    this.purchases = purchases;
  }
}
class Account {
  constructor(purchases,budget) {
    this.purchases = purchases;
    this.weeklyBudget = budget;
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

//defining user1
let wed1 = new Purchase("Grapes", 3, "Food", addDays(startOfWeek(new Date()),3), []);
let fri1 = new Purchase("Pizza", 7.5, "Food", addDays(startOfWeek(new Date()),5), ['Mo','We','Fr']);
let wed2 = new Purchase("Calculator", 20, "School", addDays(startOfWeek(new Date()),3), ["Mo","We"]);


let user1 = new Account([wed1,fri1,wed2],100)

export { user1 };
