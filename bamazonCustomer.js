var mysql = require("mysql");

var fs = require("fs");

var inquirer = require("inquirer");

var products = [];

require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    // port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.connect(function (error) {
    if (error) throw error;
    console.log("Connected as id " + connection.threadId + "\n");
    showProducts()
});


function showProducts() {
    var query = connection.query(
        "SELECT * FROM products",

        function (err, res) {
            if (err) throw err;
            console.table(`Here are the products:\n`, (res), `-----------------------------------------------------------------------`);
            products = res;
            var productIds = products.map(function (product) {
                return product.id.toString();
            })
            productIds.push("exit");
            prompt(productIds)
        })
};

function keepShopping() {
    inquirer.prompt([
        {
            type: "list",
            name: "keepShopping",
            message: "Would you like to keep shopping?",
            choices: ["Yes", "No"]
        }
    ]).then (function(answers){
        var keepShopping = answers.keepShopping;
        if(keepShopping === "Yes") {
            return showProducts()
        } else {
            console.log(`-----------------------------------------------------------------------\n`, `Thank you for shopping with Bamazon!\n`, `-----------------------------------------------------------------------`)
            process.exit();
        }
    })
}

function prompt(productIds) {
    inquirer.prompt([
        {
            type: "list",
            name: "product_id",
            message: "What is the ID of the product you would like to buy?",
            choices: productIds
        }


    ]).then(function (answers) {
        var selectedId = answers.product_id;
        if (selectedId === "exit") {
            process.exit();
        }

        // console.log(selectedId);
        var product = products.filter(function (product) {
            if (product.id == selectedId) {
                return product;
            }
        })[0];
        // console.log(product);
        inquirer.prompt([
            {
                type: "input",
                name: "amount",
                message: "How many units of the product would you like to buy?",
                validate: function (input) {
                    if (input <= product.stock_quantity) {
                        return true;

                    } else {
                        
                        return "Insufficient stock!";
                    }
                }
            }
        ]).then(function (answers) {
            var selectedAmount = product.stock_quantity - answers.amount;
            console.log(selectedAmount);
            connection.query(
                "SELECT * FROM products WHERE id = ?", [product.id],function (err, res) {
                    if (err) throw err;
            connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [selectedAmount, selectedId], function(err, res) {
                if (err) throw err;
            });
                }
            )
                console.log(`The updated stock quantity of the selected item is: `, (answers));
                console.log(`-----------------------------------------------------------------------\n`, `Thank you for shopping with Bamazon!\n`, `----------------------------------------------------------------------`)
                keepShopping();
        })

    })
};




















// No code below