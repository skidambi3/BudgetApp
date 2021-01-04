import React from 'react';
import axios from 'axios';
import { user1, Purchase, Account } from './store.js';
import { parseJSON } from 'date-fns';


const url = 'https://cors-anywhere.herokuapp.com/'+'mysql://beff28cd12f519:e3a36fc4@us-cdbr-east-02.cleardb.com/heroku_7ee16bba47948d7?reconnect=true';

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
const updateUser = async () => {
  const response = await fetch(
    url
  );
  const data = await response.json();
  console.log("User updated.")
  console.log(data);
  user1.purchases = [];
  getPurchases(data);
}

const getPurchases = (data) => {
  var item;
  for (let i = 0; i < data.length; i++) {
    item = data[i];
    var purchase = new Purchase(item.name, item.price, item.category, parseJSON(item.date), item.repetition);
    user1.purchases.push(purchase);
  }
  console.log(user1)
}

const addPurchase = async (purchase) => {
    axios.post(url, purchase)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
}

export { loadUser, updateUser, addPurchase }
