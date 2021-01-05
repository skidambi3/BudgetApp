import React, { Component } from "react";
import "./App.css";


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;



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
      repeat: null,
      formErrors: {
        itemName: "",
        price: "",
        category: "",
        day: "",
        repeat: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Item Name: ${this.state.itemName}
        Price: ${this.state.price}
        Category: ${this.state.category}
        Date: ${this.state.day}
        repeat: ${this.state.repeat}
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
              <select id="day" name="day"
              noValidate
              onChange={this.handleChange}>
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
              <select id="category" name="category"
              noValidate
              onChange={this.handleChange}>       
                <option value="selectCategory">Select Category</option>
                <option value="groceries">Groceries</option>
                <option value="rent">Rent</option>
                <option value="memberships">Memberships</option>
                <option value="travel">Travel</option>
                <option value="Transportation Expenses">Transportation Expenses</option>
                <option value="Clothes">Clothes</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            <div className="repeat">
              <label htmlFor="repeat">Repeat Purchase</label>
              <input
                placeholder="Repeat Purchase"
                type="text"
                name="repeat"
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
