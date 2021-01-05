import React, {Component} from 'react';
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
  constructor(purchases,weeklyBudget, uuid) {
    this.purchases = purchases;
    this.weeklyBudget = weeklyBudget;
    this.uuid = uuid;
  }

  componentDidMount() {
    console.log("mounted");
  }
}

class Purchase {
  constructor(id,name, price, category, day, repetition, uuid) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.day = day;
    this.repetition = repetition;
    this.uuid = uuid;
  }
}

//defining user1
let wed1 = new Purchase(132432,"Grapes", 3, "Food", addDays(startOfWeek(new Date()),3), [], 0);
let fri1 = new Purchase(37473,"Pizza", 7.5, "Food", addDays(startOfWeek(new Date()),365), ['Mo','We','Fr'], 0);
let wed2 = new Purchase(87346,"Calculator", 20, "School", addDays(startOfWeek(new Date()),365), ["Mo","We"], 0);


let user1 = new Account([wed1,fri1,wed2],140, 0)

export { user1, Purchase, Account };
