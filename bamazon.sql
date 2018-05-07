DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  itemnumber INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (itemnumber)
);

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675309, "lamp from dumpster truck", 100.00, 4, "Lamp Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675308, "leg lamp", 95.00, 12, "Lamp_Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675307, "red latern", 4.00, 75, "Lamp_Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675306, "imaginary lamp", 9.00, 100, "Lamp_Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675305, "I Love Lamp", 80.00, 120, "Lamp_Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675304, "Smoking lamp", 67.00,  75,  "Lamp_Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675303, "Favorite Lamp", 61.00, 13,  "Lamp_Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675302, "Jonathan Adler Lamp", 200.00, 75, "Lamp_Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675301, "Tiffany Lamp", 400.00, 5,  "Lamp_Department");

INSERT INTO products (itemnumber, product_name, price, stock_quantity, department_name)
VALUES (8675300, "BigBirdLamp", 302.00, 0,  "Lamp_Department");

SELECT * FROM products;


