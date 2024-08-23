const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");

const port = 3001;

app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in req.body
app.use(cors());

// Create a connection to the database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kunals#2004",
  database: "Kunal",
});

// Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.stack);
//     return;
//   }
//   console.log("Connected to the database as id " + connection.threadId);
// });

app.post("/signup", async (req, res) => {
  try {
    const { Name, Shop_name, Phone, Email, Password } = req.body;
    const [rows] = await connection.query("SELECT * FROM Shops WHERE email = ?",[Email]);
    console.log(rows);
    if(rows.length > 0)
    {
      return res.status(400).json("Email id already exists");
    }
    const query = "INSERT INTO Shops (name, shop_name, phone_no, email, password) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [Name, Shop_name, Phone, Email, Password], (err, result) => {
      if (err) {
        console.error("Error inserting data: ", err);
        return res.status(500).json("Internal Server Error");
      }

      res.status(200).json("Data inserted successfully");
    });
  } catch (err) {
    console.error("Error during signup: ", err);
    res.status(500).json("Internal Server Error");
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
