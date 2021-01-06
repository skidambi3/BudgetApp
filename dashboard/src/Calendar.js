import React, { Component } from 'react';
import './Calendar.css';
import { user1, Purchase } from './store.js';
import { startOfWeek, format, addDays, isEqual } from 'date-fns'
import CalendarItem from './CalendarItem';
import "./Figma.css";
import {deletePurchase,updatePurchase} from './Backend.js';

// const removePurchase = (purchase,account) => {
//   console.log(purchase);
//   for (let i = 0; i < account.props.purchases.length; i++) {
//     if (objectsAreEqual(account.props.purchases[i],purchase)) {
//       account.state.purchases.splice(i);
//     }
//   }
//   console.log(account);
// }


const returnPurchaseInfo = (account, date) => {
  let purchases = [];
  for (const purchase of account.purchases) {

    if (purchase.repetition.includes(format(date, 'EEEEEE')) || isEqual(purchase.day, date)) {
      purchases.push(<CalendarItem onRemove={this.handleRemove} purchase={purchase} account={account} date={date} />)

    }
  }
  return purchases
}


const objectsAreEqual = (obj1, obj2) => {
  const keys2 = Object.keys(obj2);
  for (let key of keys2) {
    if (!obj1[key] || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

const arrToStringRepetition = (repetition) => {
  let newString = ""
  for (let i = 0; i < repetition.length; i++) {
    if (i > 0) {
      newString += "," + repetition[i];
    }
    else {
      newString += repetition[i];
    }
  }
  return newString;
}

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: props.startDate,

    }
  }
    handleRemove(purchase,date) {
      console.log(purchase)
      for (let i = 0; i < this.props.account.purchases.length; i++) {
        debugger;
        if (purchase.id == this.props.account.purchases[i].id) {
          if (purchase.repetition.length > 1) {
            for (let j = 0; j < purchase.repetition.length; j++) {
              if (format(date,"EEEEEE")===purchase.repetition[j]) {
                this.props.account.purchases[i].repetition.splice(j,1);
                updatePurchase(this.props.account.purchases[i].id, arrToStringRepetition(this.props.account.purchases[i].repetition))
              }
            }
          }


          else {
            deletePurchase(this.props.account.purchases[i].id);
            console.log(this.props.account);
            console.log("deleted")
            this.props.account.purchases.splice(i,1);
          }
        }


      }
      console.log(purchase.name+purchase.repetition.join());
      this.props.onChange(this.props.account);

    }
    returnPurchaseInfo(account,date) {
      let purchases = [];
      for (const purchase of account.purchases) {

        if (purchase.repetition.includes(format(date, 'EEEEEE')) || isEqual(purchase.day, date)) {
          purchases.push(<CalendarItem key={purchase.id} onRemove={this.handleRemove.bind(this,purchase,date)} purchase={purchase} account={account} date={date} />)

        }
      }
      return purchases;
    }

  render() {

    return (
      <div class="weekly-calendar">
        <div id="sun-header-box"></div>
        <span id="sun-header">Su {format(addDays(this.props.startDate, 0), ' M/d')}</span>
        <div id="sun-box">
          {this.returnPurchaseInfo(this.props.account, addDays(this.props.startDate, 0))}
        </div>

        <div id="mon-header-box"></div>
        <span id="mon-header">Mo {format(addDays(this.props.startDate, 1), ' M/d')}</span>
        <div id="mon-box">
          {this.returnPurchaseInfo(this.props.account, addDays(this.props.startDate, 1))}
        </div>

        <div id="tues-header-box"></div>
        <span id="tues-header">Tu {format(addDays(this.props.startDate, 2), ' M/d')}</span>
        <div id="tues-box">
          {this.returnPurchaseInfo(this.props.account, addDays(this.props.startDate, 2))}
        </div>

        <div id="wed-header-box"></div>
        <span id="wed-header">
          We {format(addDays(this.props.startDate, 3), ' M/d')}
        </span>
        <div id="wed-box">
          {this.returnPurchaseInfo(this.props.account, addDays(this.props.startDate, 3))}
        </div>


        <div id="thurs-header-box"></div>
        <span id="thurs-header">Th {format(addDays(this.props.startDate, 4), ' M/d')}</span>
        <div id="thurs-box">
          {this.returnPurchaseInfo(this.props.account, addDays(this.props.startDate, 4))}
        </div>

        <div id="fri-header-box"></div>
        <span id="fri-header">Fr {format(addDays(this.props.startDate, 5), ' M/d')}</span>
        <div id="fri-box">
          {this.returnPurchaseInfo(this.props.account, addDays(this.props.startDate, 5))}
        </div>

        <div id="sat-header-box"></div>
        <span id="sat-header">Sa {format(addDays(this.props.startDate, 6), ' M/d')}</span>
        <div id="sat-box">
          {this.returnPurchaseInfo(this.props.account, addDays(this.props.startDate, 6))}
        </div>




        {/* <div class="date">
          Sunday {format(this.props.startDate, ' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate, 0), user1, this.props.startDate)}

        </div>
        <div class="date">
          Monday {format(addDays(this.props.startDate, 1), ' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate, 1), user1, addDays(this.props.startDate, 1))}

        </div>
        <div class="date">
          Tuesday {format(addDays(this.props.startDate, 2), ' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate, 2), user1, addDays(this.props.startDate, 2))}

        </div>
        <div class="date">
          Wednesday {format(addDays(this.props.startDate, 3), ' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate, 3), user1, addDays(this.props.startDate, 3))}
        </div>
        <div class="date">
          Thursday {format(addDays(this.props.startDate, 4), ' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate, 4), user1, addDays(this.props.startDate, 4))}

        </div>
        <div class="date">
          Friday {format(addDays(this.props.startDate, 5), ' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate, 5), user1, addDays(this.props.startDate, 5))}

        </div>
        <div class="date">
          Saturday {format(addDays(this.props.startDate, 6), ' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate, 6), user1, addDays(this.props.startDate, 6))}

        </div> */}

      </div>
    );
  }
}

export default Calendar;