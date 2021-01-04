const express = require('express');
const mysql = require('mysql');

const app = express();

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration


// necessary for post/put requests
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// create connection
const connection = mysql.createConnection('mysql://beff28cd12f519:e3a36fc4@us-cdbr-east-02.cleardb.com/heroku_7ee16bba47948d7?reconnect=true');

// get request: select all purchases
app.get('/purchases',  (req, res) => {
    //res.send("Hello World");
    const sql = 'SELECT * FROM purchases_db';

    connection.query(sql, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
    // try {
    //     connection.query(sql, (err, result) => {
    //         if (err) throw err;
    //         res.send(result);
    //     });
    // }
    // catch (error) {
    //     console.log("hello")
    //     console.log(error);


});

// post request: add a purchase
app.post('/purchases', (req, res) => {
    console.log(req.body);

    let sql = "INSERT INTO purchases_db SET ?";
    let query = connection.query(sql, [req.body], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('purchase added');
    });
});

// put request: edit a purchase name
app.put('/purchases/update/:id', (req, res) => {
    let newName = 'Hulu';
    let sql = `UPDATE purchases_db SET name = '${newName}' WHERE idPurchase = ${req.params.id}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('purchase updated');
    });
});

// delete request: delete a purchase
app.delete('/purchases/delete/:id', (req, res) => {
    let sql = `DELETE from purchases_db WHERE idPurchase = ${req.params.id}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('purchase deleted');
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
