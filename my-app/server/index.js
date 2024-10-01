const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const port = 3001;
const saltRounds = 10;
app.use(express.json()); 
app.use(cors());

// Create a connection to the database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kunals#2004",
  database: "Kunal",
});

const SECRET_KEY = "sendnudes";

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

// const authenticateJWT = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Forbidden' });
//     req.user = user;
//     next();
//   });
// };

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
      return res.status(404).json("Email id is not validated, sign up first");
    }

    const user = rows[0];
    const hashedPass = user.password;

    bcrypt.compare(Password, hashedPass, (err, result) => {
      if (err) {
        console.log("Error comparing password: ", err);
        return res.status(500).json("Error in comparing password");
      }

      if (result) {
        console.log("Password matched, generating token...");
        
        try {
          const token = jwt.sign({ username: user.shop_name, useremail: user.email}, SECRET_KEY, { expiresIn: '1h' });
          console.log("Token has been generated:", token);
          return res.json({ token });
        } catch (tokenError) {
          console.log("Error generating token: ", tokenError);
          return res.status(500).json("Error generating token");
        }

      } else {
        return res.status(400).json("Incorrect Password");
      }
    });
  } catch (err) {
    console.log("Internal Server Error: ", err);
    return res.status(500).json("Internal Server Error");
  }
});

app.get("/err404",(req,res)=>{
  res.send("<p> Authenticate First </p>");
})
// app.get('/Dashboard', authenticateJWT, (req,res) => {
//   return res.status(200).json("OKKK");
// })
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = connection;
