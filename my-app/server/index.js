const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const json = require("body-parser/lib/types/json");
const mysql = require("mysql2");

app.use(express.json());
app.use(cors());
// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kunals#2004",
  database: "Kunal",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});
app.post("/signup", async (req, res) => {
  try {
    const { name, shop_name, phone_no, email, password } = req.body;
    const result = await connection.query(
      "INSERT INTO Shops (name,shop_name,phone_no,email,password) VALUES ($1, $2, $3, $4) ",
      [name, shop_name, phone_no, email, password]
    );
    if (result.rowCount === 0) {
      return res.status(400).send("Failed to Send the data");
    }
    res.send(200).send("Data inserted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await connection.query(
      "SELECT * FROM Shops WHERE email = $1",
      [email]
    );
    if (result.rowCount == 0) {
      res.status(400).send("Enter Valid Email Id");
    }
    const user = result[0];

    if (user.password != password) {
      res.status(404).send("Incorrect Password");
    }
    res.redirect('/dashboard');

  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
module.exports = connection;
