import React from 'react';
import axios from 'axios';
import { user1, Purchase, Account } from './store.js';
import { parseJSON } from 'date-fns';


const url = 'http://localhost:5000/purchases';

const parseRepetitions = (repetition) => {
  let dates = [];
  if (repetition === "No") {
    return [];
  }
  let startIndex = 0;
  for (let i = 0; i < repetition.length; i++) {
    if (repetition.substring(i, i + 1) === ",") {
      dates.push(repetition.substring(startIndex, i));
      startIndex = i + 1;
    }
  }
  dates.push(repetition.substring(startIndex, repetition.length));
  return dates;
}

// gets data and loads into account onStart
const loadUser = async (uuid, handleChange) => {
  console.log(`UUID in loadUser: ${uuid}`)
  //let user = {uuid: `${uuid}`};
  const response = await fetch(
    `http://localhost:5000/users/${uuid}`
  );
  const data = await response.json();
  console.log(data);

  let account;
  if (data.length == 0) {         // if account doesn't exist, add to users_db
    console.log(`User ${uuid} created.`)
    let newUser = {uuid: uuid, budget: 150}
    addUser(newUser);
    return new Account([], newUser.budget, uuid);    //set the acount accessible in App.js to this.
  } else {                        // if account exists, load and display its data.
    console.log(`User ${uuid} loaded.`)
    account = new Account([], data.budget, uuid);
    const response = await fetch(
      `http://localhost:5000/purchases/${account.uuid}`
    );
    const purchases = await response.json();
    getPurchases(purchases, account, handleChange);
  }
}

const addUser = async (uuid) => {
  axios.post(`http://localhost:5000/users`, uuid)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

// gets data, empties account, loads data into account
const updateUser = async (account,handleChange) => {
  const response = await fetch(
    `http://localhost:5000/purchases/${account.uuid}`
  );
  const data = await response.json();
  console.log(`User ${account.uuid} updated.`)
  console.log(data);
  account.purchases = [];
  getPurchases(data, account, handleChange);
}

const getPurchases = (data,account,handleChange) => {
  var item;
  for (let i = 0; i < data.length; i++) {
    item = data[i];
    debugger;
    var purchase = new Purchase(item.id,item.name, item.price, item.category, parseJSON(item.date), parseRepetitions(item.repetition),account.uuid);
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
const updatePurchase = async (itemId, repetition) => {
  axios.put(`http://localhost:5000/purchases/update/${repetition}/${itemId}`)
  console.log("Purchase updated")
}

const deletePurchase = async (itemId) => {
  axios.delete(
    `http://localhost:5000/purchases/delete/${itemId}`
   )
  console.log("Purchase deleted.")
  }

export { loadUser, updateUser, addPurchase, deletePurchase,updatePurchase }
