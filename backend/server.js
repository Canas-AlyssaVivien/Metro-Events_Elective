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
});

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
});

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
});

app.listen(8081, () => {
    console.log("listening");
});

app.post('/addevent', (req, res) => {
    const sql = "INSERT INTO events (eventTitle, eventDate, eventTime, eventCreated, username, eventDescription) VALUES (?)";
    const values = [
        req.body.eventTitle,
        req.body.eventDate,
        req.body.eventTime,
        req.body.eventCreated,
        req.body.username,
        req.body.eventDescription
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
});

app.post('/insertparticipant', (req, res) => {
    const requestID = req.body.requestID;

    const sqlDeleteRequest = "DELETE FROM requests WHERE requestID = ?";

    const values = [
        req.body.eventTitle,
        req.body.username
    ]

    db.beginTransaction((err) => {
        if (err) {
            console.error("Error beginning transaction:", err);
            return res.status(500).json("Error beginning transaction");
        }

        db.query("INSERT INTO participants (eventTitle, username) VALUES (?)", [values], (err, insertResult) => {
            if (err) {
                db.rollback(() => {
                    console.error("Error inserting into participants:", err);
                    return res.status(500).json("Error inserting into participants");
                });
            }

            db.query(sqlDeleteRequest, [requestID], (err, deleteResult) => {
                if (err) {
                    db.rollback(() => {
                        console.error("Error deleting from requests:", err);
                        return res.status(500).json("Error deleting from requests");
                    });
                }

                db.commit((err) => {
                    if (err) {
                        db.rollback(() => {
                            console.error("Error committing transaction:", err);
                            return res.status(500).json("Error committing transaction");
                        });
                    }
                    
                    return res.status(200).json("Participant inserted and request deleted successfully");
                });
            });
        });
    });
});

app.delete('/deleterequest', (req, res) => {
    const requestID = req.body.requestID;
    const sql = "DELETE FROM requests WHERE requestID = ?";
    db.query(sql, [requestID], (err, data) => {
        if(err){
            return res.status(500).json({ error: "Error deleting request" });
        }
        return res.json({ message: "Request deleted successfully" });
    });
});

app.get('/organizerhome', (req, res) => {
    db.query("SELECT * FROM events", (err, data) => {
      if (err) {
        console.error('Error fetching events:', err);
      } else {
        res.json(data);
      }
    });
});

app.get('/organizernotifications', (req, res) => {
    db.query("SELECT * FROM requests", (err, data) => {
      if (err) {
        console.error('Error fetching events:', err);
      } else {
        res.json(data);
      }
    });
});