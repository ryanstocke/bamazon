DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Surge", "Grocery", 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Snickers", "Grocery", 1.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hockey Stick", "Sporting Goods", 100, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Star Wars T Shirts", "Clothing", 9.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Light Bulbs", "Housing", 5.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bed Sheets", "Housing", 49.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweatpants", "Clothing", 19.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping Bag", "Sporting Goods", 99.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Collar", "Pet Supplies", 19.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Leash", "Clothing", 14.99, 10);



SELECT * FROM products;