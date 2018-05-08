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
var orderItem;


function openDatabase() {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazonDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
  });  
}

openDatabase();
readProducts();

function readProducts() {
  console.log("Displaying all products...\n");
  connection.query("SELECT product_name, itemnumber, price FROM products", function(err, res) { 
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(JSON.parse(JSON.stringify(res)))
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
    orderItem = answer.itemNumber;
        console.log(orderItem);
        orderQuantity();
  });
    function orderQuantity() {
    inquirer
    .prompt([
      {
      name: "stockQuantity",
      type: "input",
      message: "How many of this item would you like to buy?",
      }
    ])
    .then(function(answer) {
        console.log(answer.stockQuantity);//this is the quantity the customer wants
        console.log("      ");
        console.log("Your order is being placed. Please wait a few minutes while Bamazon processes it.")
        var cost = (answer.stockQuantity * itemPrice);
        console.log("The cost is " + cost); 
      
        console.log(orderItem);
        connection.query("Select * FROM products where ITEMNUMBER="+ orderItem, function (err, res){
      
          if (answer.stockQuantity > res[0].stock_quantity){
            console.log("Insufficient quantity! Please choose a different quantity")
          

          }
          else{
          console.log("Your order has been placed");
          var newQty=(res[0].stock_quantity - answer.stockQuantity);
          console.log("the new quantity in the database is  " + newQty);
          connection.query("Update Products set stock_quantity = " + newQty,'where itemnumber ='+orderItem,function (err, res){
            var randomNumber = Math.floor(Math.random() * 1000);
          console.log("Your order number is" + randomNumber) //random number generator )
           console.log("Thanks for your order!"); 
            })
            
          connection.end();
          }
        })
      
        })
 }
}
    
