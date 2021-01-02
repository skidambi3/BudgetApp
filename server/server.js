const express = require('express');
const mysql = require('mysql');

const app = express();

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration


// necessary for post/put requests
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: 'purchases_db'
});
db.connect((err) => {
    if (err) {
        throw(err);
    }
    console.log("MySQL connected...");
});

// get request: select all purchases
app.get('/purchases',  (req, res) => {
    const sql = 'SELECT * FROM purchases';

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// post request: add a purchase
app.post('/purchases', (req, res) => {
    console.log(req.body);

    let sql = "INSERT INTO purchases SET ?";
    let query = db.query(sql, [req.body], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('purchase added');
    });
});

// put request: edit a purchase name
app.put('/purchases/update/:id', (req, res) => {
    let newName = 'Hulu';
    let sql = `UPDATE purchases SET name = '${newName}' WHERE idPurchase = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('purchase updated');
    });
});

// delete request: delete a purchase
app.delete('/purchases/delete/:id', (req, res) => {
    let sql = `DELETE from purchases WHERE idPurchase = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('purchase deleted');
    });
});

app.listen(5000, () => console.log('Server started on port 5000'));
