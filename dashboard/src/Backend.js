import React from 'react';
import axios from 'axios';
import { user1, Purchase, Account } from './store.js';
import { parseJSON } from 'date-fns';


const url = 'http://localhost:5000/purchases';

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

const deletePurchase = async (itemId) => {
  axios.delete(
    `http://localhost:5000/purchases/delete/${itemId}`
   )
  console.log("Purchase deleted.")
  }

export { loadUser, updateUser, addPurchase, deletePurchase }
