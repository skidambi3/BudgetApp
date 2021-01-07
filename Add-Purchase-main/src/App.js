import React, { Component } from "react";
import "./App.css";


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: null,
      price: null,
      category: null,
      day: null,
      repeatPurchase: null,
      formErrors: {
        itemName: "",
        price: "",
        category: "",
        day: "",
        repeatPurchase: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Item Name: ${this.state.itemName}
        Price: ${this.state.lastName}
        Category: ${this.state.category}
        Date: ${this.state.day}
        Repeat Purchase: ${this.state.repeatPurchase}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create New Purchase</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="itemName">
              <label htmlFor="itemName">Item Name</label>
              <input
                className={formErrors.itemName.length > 0 ? "error" : null}
                placeholder="Item Name"
                type="text"
                name="itemName"
                noValidate
                onChange={this.handleChange}
              />

            </div>

            <div className="price">
              <label htmlFor="price">Price</label>
              <input
                placeholder="Enter Number"
                type="text"
                name="price"
                noValidate
                onChange={this.handleChange}
              />

            </div>

            <div className="day">
              <label htmlFor="day">Date Purchased</label>
              <select id="day" name="day">
                <option value="selectDate">Select Date</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>

              </select>
              
            </div>
            
            <div className="category">
              <label htmlFor="category">Category</label>
              <select id="category" name="category">
              <option value="selectCategory">Select Category</option>
                <option value="sunday">Groceries</option>
                <option value="monday">Rent</option>
                <option value="tuesday">Memberships</option>
                <option value="wednesday">Travel</option>
                <option value="thursday">Transportation Expenses</option>
                <option value="friday">Clothes</option>
                <option value="saturday">Entertainment</option>

              </select>
            </div>

            <div className="repeatPurchase">
              <label htmlFor="repeatPurchase">Repeat Purchase</label>
              <input
                placeholder="Repeat Purchase"
                type="text"
                name="Repeat Purchase"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            
            <div className="createPurchase">
              <button type="submit">Add Purchase</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
