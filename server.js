/**
 * Author: Youwei Yang
 * Description: handles all the client requests
 */

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rate_me'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/**
 * select and return all shows
 */
app.get('/api/shows', (req, res) => {
    let sql = 'SELECT * FROM shows';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

/**
 * record a rating
 */
app.get('/api/rate', (req, res) => {
    let ratingTarget;
    switch(req.query.rating){
        case "1":
            ratingTarget = "one";
            break;
        case "2":
            ratingTarget = "two";
            break;
        case "3":
            ratingTarget = "three";
            break;
        case "4":
            ratingTarget = "four";
            break;
        case "5":
            ratingTarget = "five";
            break;
    }

    let sql = `UPDATE shows SET ${ratingTarget} = ${ratingTarget} + 1 WHERE id = ${req.query.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    })
})

/**
 * adding a new show
 */
app.get('/api/newShow', (req, res) => {
    let sql = `INSERT INTO shows (title, descrip, one, two, three, four, five)
                Values ('${req.query.title}', '${req.query.description}', 0, 0, 0, 0, 0)`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    })
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));