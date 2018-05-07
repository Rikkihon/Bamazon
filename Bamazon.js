// Create a MySQL Database called bamazon.
// Then create a Table inside of that database called products.
// The products table should have each of the following columns:

// Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale.
// Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.


// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.


// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.


var mysql = require("mysql");
var inquirer = require("inquirer");

var connection;

var itemToOrder;

function openDatabase() {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
    // Your password
    password: "danito66$",
    database: "bamazonDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });  
}

openDatabase();
readProducts();

function readProducts() {
  console.log("Displaying all products...\n");
  connection.query("SELECT product_name, itemnumber, price FROM products", function(err, res) { 
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
    orderNumber();
  });
}

function orderNumber() {
  inquirer
    .prompt([
      {
      name: "itemNumber",
      type: "input",
      message: "What is the item number you wish to bid on?",
      
    }])
    .then(function(answer) {
     let orderItem = answer.input;
        console.log(answer.itemNumber);
        itemToOrder = answer.itemNumber;
        //orderQuantity();
   });

    //function orderQuantity() {
    inquirer
    .prompt([
      {
      name: "stockQuantity",
      type: "input",
      message: "How many of this item would you like to buy?",
      }
    ])
    .then(function(answer) {
        console.log(answer.stockQuantity);
        let orderQuantity = answer.stock_QUANTITY;
        console.log(orderQuantity);
        console.log("      ");
        console.log("Your order is being placed. Please wait a few minutes while Bamazon processes it.")
        orderVerification();
    });
  }//)

  function orderVerification() {
    openDatabase();

    connection.query("SELECT ITEMNUMBER, stock_QUANTITY FROM products", function(err, res) { 
      if (err) throw err;
      console.log(res);
      // Log all results of the SELECT statement
      for (var i = 0; i < 9; i++) {
        var res = res[i];
      console.log("getting data out of the array", res.ITEMNUMBER);
      //console.log(itemToOrder);
      //console.log("wheeeee " + res);
      //console.log(res[0].ITEMNUMBER);  

      if (stock_quanity < 1) {
        console.log("Insufficient quantity! Please choose a different item")
      }

      console.log("Your order has been placed");
      console.log("The cost of this order is" price * quantity)
      connection.end();
      })
    };
    function updateProduct() {
      console.log("Updating the in-store quantities remaining...\n");
      opendatabase();
      var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stockQuantity: -1
          }
        ],
        function(err, res) {
          console.log(res.affectedRows + " products updated!\n");
        }
      );
    
      // logs the actual query being run
      console.log(query.sql);
    }  
  