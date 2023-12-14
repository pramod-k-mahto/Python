const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors'); // Import the cors middleware

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with the specific origin you want to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

app.get("/userdata", (req, res) => {
  connection.query('SELECT * FROM student', (error, rows, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    } else {
      // console.log(rows);
      res.json(rows); // Send the result as JSON
    }
  });
});

app.post('/userdata', (req, res) => {
  console.log("Insertion started");

  const { name, phone, email } = req.body;

  // if (!name || !phone || !email) {
  //   return res.status(400).json({ error: 'Name, phone, and email are required fields.' });
  // }

  const sql = "INSERT INTO student (name) VALUES ?";
  const values = [[name]];

  connection.query(sql, [values], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Insertion successful");
      // alert("Successful");
      res.send("Successful");
      // res.redirect('index.html'); // Redirect to index.html
    }
  });
});

app.delete('/userdata/:id', (req, res) => {
  console.log("dddddddddd")
  const userId = req.params.id;
  console.log(userId)

  const sql = 'DELETE FROM student WHERE idstudent = ?';
  connection.query(sql, [userId],(error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Deletion successful');

      res.send('Deleted successfully');
    }
  });

})

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.post('/about/MyUpdate/:userId', (req, res) => {
  console.log("Updating user data");

  const userId = req.params.userId; // Use req.params to get the userId from the URL
  const { name } = req.body;
  const sql = 'UPDATE student SET name=? WHERE idstudent=?';
  const values = [name, userId];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error updating user data:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User data updated successfully');
      res.send('User data updated successfully');
    }
  });
});


app.listen(3000, () => {
  console.log("App is listening at port number 3000");
});
