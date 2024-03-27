// const express = require("express");
// const mysql = require('mysql');
// const cors = require('cors');

import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

// const app = express();
// app.use(cors());
// app.use(express.json());

const app = express();
app.use(cookieParser())
app.use(cors({
        origin: ["http://localhost:3000"],
        methods: ["POST, GET"],
        credentials: true
}));
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
            const name = data[0].username;
            const token = jwt.sign({name}, "our-token", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json(data);
        } else {
            return res.json("Fail");
        }
    })
});

app.get('/events', (req, res) => {
  const sql = 'SELECT * FROM events';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/admin', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.get('/adminnotifications', (req, res) => {
    const sql = 'SELECT * FROM orgrequests';
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.post('/sendApprove', (req, res) => {
    const status = 1;

    const sql = "INSERT INTO orgnotifications (username, status) VALUES (?)";
    const values = [
        req.body.username,
        status
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
});

app.post('/deleteUser', (req, res) => {
    const username = req.body.username;
    const deleteRequestSql = 'DELETE FROM users WHERE username = ?';
    db.query(deleteRequestSql, [username], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        db.commit((err) => {
            if (err) {
                console.error('Error committing transaction:', err);
                return res.status(500).json({ error: 'Error committing transaction' });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        });
    });
});

app.post('/deleteEvent', (req, res) => {
    const eventID = req.body.eventID
    const deleteRequestSql = 'DELETE FROM events WHERE eventID = ?';
    db.query(deleteRequestSql, [eventID], (err, result) => {
        if (err) {
            console.error('Error deleting event:', err);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        db.commit((err) => {
            if (err) {
                console.error('Error committing transaction:', err);
                return res.status(500).json({ error: 'Error committing transaction' });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        });
    });
});

app.post('/cancelevent', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        const values = [
            req.body.eventID,
            req.body.eventTitle,
            username, 
            req.body.reason
        ];

        const sql = "INSERT INTO cancelledevents (eventID, eventTitle, username, reason) VALUES (?)";
        db.query(sql, [values], (err, data) => {
            if (err) {
                console.error('Error inserting into cancelledevents:', err);
                return res.status(500).json({ error: "Error cancelling event" });
            }

            const deleteRequestSql = 'DELETE FROM events WHERE username = ?';
            db.query(deleteRequestSql, [username], (err, result) => {
                if (err) {
                    console.error('Error deleting event:', err);
                    return res.status(500).json({ error: 'Error deleting event' });
                }

                return res.json(data);
            });
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});


app.post('/sendDecline', (req, res) => {
    const username = req.body.username;
    const status = 0;

    const sql = "INSERT INTO orgnotifications (username, status) VALUES (?)";
    const values = [
        username,
        status
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }

        const deleteRequestSql = 'DELETE FROM orgrequests WHERE username = ?';
            db.query(deleteRequestSql, [username], (err, result) => {
                if (err) {
                    console.error('Error deleting request:', err);
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Error deleting request' });
                    });
                }
            });
        return res.json(data);
    })
});

  app.post('/approveUser', (req, res) => {
    const username = req.body.username;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return res.status(500).json({ error: 'Error beginning transaction' });
        }

        const updateUserSql = 'UPDATE users SET usertype = 1 WHERE username = ?';
        db.query(updateUserSql, [username], (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                return db.rollback(() => {
                    res.status(500).json({ error: 'Error updating user' });
                });
            }

            const deleteRequestSql = 'DELETE FROM orgrequests WHERE username = ?';
            db.query(deleteRequestSql, [username], (err, result) => {
                if (err) {
                    console.error('Error deleting request:', err);
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Error deleting request' });
                    });
                }

                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            return res.status(500).json({ error: 'Error committing transaction' });
                        }
                        return res.status(200).json({ message: 'User approved, request deleted, and notification inserted successfully' });
                    });
                });
        });
    });
});

app.post('/requestToOrganizer', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;
        console.log(username);

        const { status } = req.body;
        const sql = "INSERT INTO orgrequests (username, status) VALUES (?, ?)";
        db.query(sql, [username, status], (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error sending request" });
            }
            return res.json(data);
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});


app.post('/requestToJoin', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;
        console.log(username);

        const { eventTitle, status, organizer } = req.body;
        const sql = "INSERT INTO requests (username, eventTitle, status, organizer) VALUES (?, ?, ?, ?)";
        db.query(sql, [username, eventTitle, status, organizer], (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error sending request" });
            }
            return res.status(200).json({ message: "Request sent successfully" });
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});



app.listen(8081, () => {
    console.log("listening");
});

app.post('/addevent', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        const sql = "INSERT INTO events (eventTitle, eventDate, eventTime, eventCreated, username, eventDescription) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.eventTitle,
            req.body.eventDate,
            req.body.eventTime,
            req.body.eventCreated,
            username, 
            req.body.eventDescription
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("Error adding event:", err);
                return res.status(500).json("Error adding event");
            }
            return res.status(200).json("Event added successfully");
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});


app.post('/insertparticipant', (req, res) => {
    const requestID = req.body.requestID;
    const status = 1;

    const sqlDeleteRequest = "DELETE FROM requests WHERE requestID = ?";

    const values = [
        req.body.eventTitle,
        req.body.username
    ]

    const valuess = [
        req.body.eventTitle,
        status,
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

            db.query("INSERT INTO eventnotifications (eventTitle, status, username) VALUES (?)", [valuess], (err, insertResult) => {
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
});

app.post('/deleterequest', (req, res) => {
    const requestID = req.body.requestID;
    const status = 0;

    const sqlDeleteRequest = "DELETE FROM requests WHERE requestID = ?";

    const valuess = [
        req.body.eventTitle,
        status,
        req.body.username
    ]

    db.beginTransaction((err) => {
        if (err) {
            console.error("Error beginning transaction:", err);
            return res.status(500).json("Error beginning transaction");
        }

            db.query("INSERT INTO eventnotifications (eventTitle, status, username) VALUES (?)", [valuess], (err, insertResult) => {
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

app.get('/events', (req, res) => {
    db.query("SELECT * FROM events", (err, data) => {
      if (err) {
        console.error('Error fetching events:', err);
      } else {
        res.json(data);
      }
    });
});

app.get('/organizerhome', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        db.query("SELECT * FROM events WHERE username = ?", [username], (err, data) => {
            if (err) {
                console.error('Error fetching events:', err);
                return res.status(500).json({ error: "Error fetching events" });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});

app.get('/cancelledevents', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        db.query("SELECT * FROM cancelledevents WHERE username = ?", [username], (err, data) => {
            if (err) {
                console.error('Error fetching events:', err);
                return res.status(500).json({ error: "Error fetching events" });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});

app.get('/organizernotifications', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        db.query("SELECT * FROM requests WHERE organizer = ?", [username], (err, data) => {
            if (err) {
                console.error('Error fetching events:', err);
                return res.status(500).json({ error: "Error fetching events" });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

app.get('/usernotifications', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        console.log("Username:", username);

        db.query("SELECT * FROM eventnotifications WHERE username = ?", [username], (err, data) => {
            if (err) {
                console.error('Error fetching notifications:', err);
                return res.status(500).json({ error: "Error fetching notifications" });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});

app.get('/orgrequests', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        db.query("SELECT * FROM orgrequests WHERE username = ?", [username], (err, data) => {
            if (err) {
                console.error('Error fetching orgrequests:', err);
                return res.status(500).json({ error: "Error fetching orgrequests" });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});

<<<<<<< HEAD
app.get('/cancelledeventnotif', (req, res) => {
=======
app.get('/userorgnotifications', (req, res) => {
>>>>>>> 4b2fcce0c95e609baa35c92d2511a3ebf5142629
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }
<<<<<<< HEAD
=======

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        db.query("SELECT * FROM orgrequests WHERE username = ? AND status = 0", [username], (err, data) => {
            if (err) {
                console.error('Error fetching notifications:', err);
                return res.status(500).json({ error: "Error fetching notifications" });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});

>>>>>>> 4b2fcce0c95e609baa35c92d2511a3ebf5142629

    try {
        const decodedToken = jwt.verify(token, "our-token");
        const username = decodedToken.name;

        db.query(`
            SELECT * FROM cancelledevents ce
            INNER JOIN participants p ON ce.eventTitle = p.eventTitle
            WHERE p.username = ?`, [username], (err, data) => {
            if (err) {
                console.error('Error fetching cancelled events:', err);
                return res.status(500).json({ error: "Error fetching cancelled events" });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
});