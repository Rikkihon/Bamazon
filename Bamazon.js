var mysql = require("mysql");
var inquirer = require("inquirer");

var connection;

var itemToOrder;
var orderItem;
var itemPrice;

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
        //console.log(orderItem);
        connection.query("Select * FROM products where ITEMNUMBER="+ orderItem, function (err, res){
      
          if (answer.stockQuantity > res[0].stock_quantity){
            console.log("Insufficient quantity! Please choose a different quantity")
            connection.end();
          }
          else{
          console.log("Your order has been placed");
          var newQty=(res[0].stock_quantity - answer.stockQuantity);
          var cost = (answer.stockQuantity * res[0].price);
          console.log("The cost is $ " + cost); 
      
          console.log("the new quantity in the database is  " + newQty + "items");
          connection.query("Update Products set stock_quantity = " + newQty,'where itemnumber ='+orderItem,function (err, res){
            var randomNumber = Math.floor(Math.random() * 1000);
          console.log("Your order number is  " + randomNumber) //random number generator )
           console.log("Thanks for your order!"); 
            })
            
          connection.end();
          }
        })
      
        })
 }
}
    
