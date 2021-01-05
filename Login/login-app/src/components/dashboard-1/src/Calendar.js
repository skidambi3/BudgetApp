import React, {Component} from 'react';
import './Calendar.css';
import {user1} from './store.js';
import { startOfWeek,format,addDays,isEqual } from 'date-fns'



const returnPurchaseInfo = (day,account) => {
  let purchases = [];
  console.log(day);
  for (const purchase of account.purchases) {

    if (purchase.repetition.includes(format(day,'EEEEEE')) ){
      purchases.push(<div><li class = "purchase-item">{purchase.name} : ${purchase.price}</li> <button>Remove Above</button></div>)

    }
    else if (isEqual(purchase.day,day)) {
        purchases.push(<div><li class = "purchase-item">{purchase.name} : ${purchase.price}</li> <button>Remove Above</button></div>)

    }
  }
  return purchases
}



class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
        startDate: props.startDate
    }
  }
  render() {

    return (
      <div class = "weekly-calendar">
        <div class = "date">
          Sunday {format(this.props.startDate,' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate,0),user1)}

        </div>
        <div class = "date">
          Monday {format(addDays(this.props.startDate,1),' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate,1),user1)}

        </div>
        <div class = "date">
          Tuesday {format(addDays(this.props.startDate,2),' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate,2),user1)}

        </div>
        <div class = "date">
          Wednesday {format(addDays(this.props.startDate,3),' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate,3),user1)}
        </div>
        <div class = "date">
          Thursday {format(addDays(this.props.startDate,4),' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate,4),user1)}

        </div>
        <div class = "date">
          Friday {format(addDays(this.props.startDate,5),' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate,5),user1)}

        </div>
        <div class = "date">
          Saturday {format(addDays(this.props.startDate,6),' M/d')}
          {returnPurchaseInfo(addDays(this.props.startDate,6),user1)}

        </div>

      </div>
    );
  }
}

export default Calendar;