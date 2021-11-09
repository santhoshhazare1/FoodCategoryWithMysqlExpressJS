
const express = require('express');
const mysql = require('mysql2');

var router = express.Router();
//Configuring express server

router.use(express.json());
var app = express();
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_1',
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

app.get('/category', (req, res) => {
   
    mysqlConnection.query('select * from category;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    })
});

app.get('/fooditem', (req, res) => {
   
    mysqlConnection.query('select * from fooditem;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    })
});

app.get('/fooditem/:id', (req, res) => {
    mysqlConnection.query('SELECT * from fooditem WHERE item_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete('/fooditem/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM fooditem WHERE item_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.post('/insertfooditem', (req, res) => {
    console.log('body',req.body);
    mysqlConnection.query('INSERT INTO fooditem (item_type,item_name,category_id) VALUES ?',[req.body.item_type,req.body.item_name, req.body.category_id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/itemwithcategory', (req, res) => {
   
    mysqlConnection.query('select item_type,item_name,item_id,category_name from fooditem INNER JOIN category ON fooditem.category_id=category.category_id;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    })
});

app.listen(3000);
module.exports = router;