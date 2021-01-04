import React from 'react';
import axios from 'axios';
import { user1, Purchase, Account } from './store.js';
import { parseJSON } from 'date-fns';


const url = 'http://localhost:5000/purchases';

const parseRepetitions = (repetition) => {
  let dates = [];
  if (repetition === "No") {
    return [repetition];
  }
  let startIndex = 0;
  for (let i = 0; i < repetition.length; i++) {
    if (repetition.substring(i, i + 1) === "/") {
      dates.push(repetition.substring(startIndex, i));
      startIndex = i + 1;
    }
  }
  dates.push(repetition.substring(startIndex, repetition.length));
  return dates;
}

// gets data and loads into account onStart
const loadUser = async () => {
  const response = await fetch(
    url
  );
  const data = await response.json();
  console.log("User loaded.")
  console.log(data);
  getPurchases(data);
}

// gets data, empties account, loads data into account
const updateUser = async (account,handleChange) => {
  const response = await fetch(
    url
  );
  const data = await response.json();
  console.log("User updated.")
  console.log(data);
  account.purchases = [];
  getPurchases(data,account,handleChange);
}

const getPurchases = (data,account,handleChange) => {
  var item;
  for (let i = 0; i < data.length; i++) {
    item = data[i];
    var purchase = new Purchase(item.id,item.name, item.price, item.category, parseJSON(item.date), parseRepetitions(item.repetition));
    account.purchases.push(purchase);
  }
  console.log(account);
  handleChange(account);

}

const addPurchase = async (purchase,account,handleChange) => {
    axios.post(url, purchase)
      .then(response => {
        console.log(response)
        updateUser(account,handleChange)

      })
      .catch(error => {
        console.log(error)
      })
}

export { loadUser, updateUser, addPurchase }
