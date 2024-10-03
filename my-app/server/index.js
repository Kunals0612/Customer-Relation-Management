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

app.use(express.urlencoded({extended : true}));

require('dotenv').config();

const pass1 = process.env.password; 


// Create a connection to the database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbmsl",
});

const SECRET_KEY = "sendnudes";

//Connect to the database
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
    console.log(Name);
    const [rows] = await connection.query(
      "SELECT * FROM Shop WHERE Email = ?",
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
        "INSERT INTO Shop (Shop_id, Owner_name, Shop_name, Phone_no, Email, Password) VALUES (? ,?, ?, ?, ?, ?)";
      connection.query(
        query,
        [1,Name, Shop_name, Phone, Email, hash],
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

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Token received: ", token); // Debugging token received

  if (!token) {
    console.log("No token found in request headers");
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log("JWT verification failed:", err);
      return res.status(403).json({ message: 'Forbidden' });
    }
    console.log("Decoded JWT token:", user); 
    req.user = user;
    console.log("User authenticated:", user); // Debugging successful authentication
    next();
  });
};


app.post("/login", async (req, res) => {
  try {
    console.log("received");
    const { Email, Password } = req.body;
    console.log(Email, Password);
    const [rows] = await connection.query(
      "SELECT * FROM Shop WHERE Email = ?",
      [Email]
    );
    console.log("Rows", rows);
    if (rows.length == 0) {
      return res.status(404).json("Email id is not validated, sign up first");
    }

    const user = rows[0];
    const hashedPass = user.Password;

    console.log(user.Shop_id);


    bcrypt.compare(Password, hashedPass, (err, result) => {
      if (err) {
        console.log("Error comparing password: ", err);
        return res.status(500).json("Error in comparing password");
      }

      if (result) {
        console.log("Password matched, generating token...");
        
        try {
          const token = jwt.sign(
            { shop_id: user.Shop_id, username: user.Shop_name, useremail: user.Email },
            SECRET_KEY,
            { expiresIn: '1h' }
          );
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


app.post("/addCustomer", authenticateJWT, async (req, res) => {
  try {
    const { Customer_name, Customer_ph_no, Customer_email, Item_id, Quantity, Price } = req.body;
    const shop_id = req.user.shop_id;

    try {
      // Insert customer into the Customer table
      const query = "INSERT INTO Customer (Customer_id, Shop_id, Customer_name, Customer_ph_no, Customer_email) VALUES (?, ?, ?, ?, ?)";
      const [result] = await connection.query(query, [null, shop_id, Customer_name, Customer_ph_no, Customer_email]);
      //res.status(201).json({ message: "Customer added successfully", customerId: result.insertId });
    } catch (err) {
      console.error("Error inserting customer: ", err);
      return res.status(500).json("Error inserting customer into the database");
    }

    let customerRows;
    try {
      // Fetch the customer ID from the Customer table
      const customerQuery = "SELECT Customer_id FROM Customer WHERE Customer_email = ?";
      [customerRows] = await connection.query(customerQuery, [Customer_email]);
      
    } catch (err) {
      console.error("Error fetching customer: ", err);
      return res.status(500).json("Error fetching customer from the database");
    }

    if (customerRows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const Customer_id = customerRows[0].Customer_id;

    try {
      // Insert purchase into the Purchase table
      const purchaseQuery = "INSERT INTO Purchase (Shop_id, Customer_id) VALUES (?, ?)";
      const [purchaseResult] = await connection.query(purchaseQuery, [shop_id, Customer_id]);
      //res.status(201).json({ message: "Purchase added successfully" });
    } catch (err) {
      console.error("Error inserting purchase: ", err);
      return res.status(500).json("Error inserting purchase into the database");
    }

    try {
      // Insert purchase item into the Purchase_item table
      const purchaseItemQuery = "INSERT INTO Purchase_item (Item_id, Quantity, Purchase_amount) VALUES (?, ?, ?)";
      const [purchaseItemResult] = await connection.query(purchaseItemQuery, [Item_id, Quantity, Price]);
      res.status(201).json({ message: "Purchase Item added" });
    } catch (err) {
      console.error("Error inserting purchase item: ", err);
      return res.status(500).json("Error inserting purchase item into the database");
    }
  } catch (err) {
    console.error("Error adding customer: ", err);
    res.status(500).json("Internal Server Error");
  }

    

    
});



app.post("/getCustomersByItem", async (req, res) => {
  try {
    const { item_name } = req.body;

    if (!item_name) {
      return res.status(400).json("Item name is required");
    }

    const query = `
      SELECT c.Customer_id, c.Customer_name, c.Customer_email, p.Purchase_id, i.Item_name
      FROM Customer c
      JOIN Purchase p ON c.Customer_id = p.Customer_id
      JOIN Purchase_item pi ON p.Purchase_id = pi.Purchase_id
      JOIN Item i ON pi.Item_id = i.Item_id
      WHERE i.Item_name = ?;
    `;

    const [rows] = await connection.query(query, [item_name]);

    if (rows.length === 0) {
      return res.status(404).json("No customers found for this item");
    }

    res.status(200).json(rows);

  } catch (err) {
    console.error("Error fetching customers: ", err);
    res.status(500).json("Internal Server Error");
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
