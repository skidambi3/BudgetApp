import React, { Component } from 'react';
import './Calendar.css';
import { startOfWeek,format,addDays,isEqual } from 'date-fns'
import "./Figma.css"


class CalendarItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            purchase: props.purchase,
            account: props.account,
            display: true,
            date: props.date
        }
    }
    handleRemove() {
      if (this.props.onRemove) {
        this.props.onRemove();
      }

    }
    render() {
          return (
            <div>
                <li id="calendar-item" class="purchase-item">{this.state.purchase.name} : ${this.state.purchase.price}</li>
                <button id="calendar-item-remove" onClick={() => this.handleRemove()}>Remove Above</button>
                <h4></h4>
            </div>
          )


    }
}

export default CalendarItem;