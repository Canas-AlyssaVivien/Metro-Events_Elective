const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "metroevents"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (usertype, email, username, password) VALUES (?)";
    const values = [
        req.body.usertype,
        req.body.email,
        req.body.username,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json(err);
        }
        if(data.length > 0){
            return res.json(data);
        } else {
            return res.json("Fail");
        }
    })
})

app.get('/events', (req, res) => {
  const sql = 'SELECT * FROM events';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/requestToOrganizer', (req, res) => {
    const { username, status } = req.body;
    const sql = "INSERT INTO orgrequests (username, status) VALUES (?, ?)";
    db.query(sql, [username, status], (err, data) => {
        if(err){
            return res.status(500).json({ error: "Error sending request" });
        }
        return res.status(200).json({ message: "Request sent successfully" });
    })
})

app.post('/requestToJoin', (req, res) => {
    const { username, eventTitle, status } = req.body;
    const sql = "INSERT INTO requests (username, eventTitle, status) VALUES (?, ?, ?)";
    db.query(sql, [username, eventTitle, status], (err, data) => {
        if(err){
            return res.status(500).json({ error: "Error sending request" });
        }
        return res.status(200).json({ message: "Request sent successfully" });
    });
});


app.listen(8081, () => {
    console.log("listening");
})