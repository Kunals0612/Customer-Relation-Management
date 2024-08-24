const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const port = 3001;
const saltRounds = 10;
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
    const [rows] = await connection.query(
      "SELECT * FROM Shops WHERE email = ?",
      [Email]
    );
    console.log(rows);
    if (rows.length > 0) {
      return res.status(400).json("Email id already exists");
    }
    bcrypt.hash(Password, saltRounds, async (err, hash) => {
      if(err){
         return res.status(500).json("Error in encryption");
      }
      else{
      const query =
        "INSERT INTO Shops (name, shop_name, phone_no, email, password) VALUES (?, ?, ?, ?, ?)";
      connection.query(
        query,
        [Name, Shop_name, Phone, Email, hash],
        (err, res) => {
          if (err) {
            console.error("Error inserting data: ", err);
            return res.status(500).json("Internal Server Error");
          }
        }
      );
      res.status(200).json("Data inserted successfully");
    }
    });
  } catch (err) {
    console.error("Error during signup: ", err);
    res.status(500).json("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("received");
    const { Email, Password } = req.body;
    console.log(Email, Password);
    const [rows] = await connection.query(
      "SELECT * FROM Shops WHERE email = ?",
      [Email]
    );
    console.log("Rows", rows);
    if (rows.length == 0) {
      return res.status(400).json("Email id is not validated sign up first");
    }
    const user = rows[0];
    const hashedPass = user.password;
    console.log(hashedPass);
    console.log(typeof user);
    console.log("Users: ", user);
    console.log("Password is: ", hashedPass);
    bcrypt.compare(Password, hashedPass, (err, result) => {
      if(err){
        console.log("Error comparing password: ", err);
        return res.status(500).json("Error in comparing password");
      }else{
        if(result)
        {
          console.log("Successful");
          return res.status(200).json("Login Successful");
        }
        else{
          return res.status(404).json("Incorrect Password");
        }
      }
    })
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = connection;
