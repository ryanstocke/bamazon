var mysql = require("mysql");

var fs = require("fs");

var inquirer = require("inquirer");

var products = [];

var connection = mysql.createConnection({
    host: "localhost",
    // port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
})

 connection.connect(function(error){
     if (error) throw error;
     console.log("Connected as id " + connection.threadId + "\n");
     showProducts()
 });


 function showProducts() {
    var query = connection.query(
        "SELECT * FROM products",
        
        function(err, res) {
            if (err) throw err;

          console.log((res) , " Here are the products!\n");
          products = res;
          var productIds = products.map(function(product){
            return product.id.toString();
          })
            productIds.push("exit");
            prompt(productIds)
    })
 };

function prompt(productIds){
    inquirer.prompt([
        {
            type: "list",
            name: "product_id",
            message: "What is the ID of the product you would like to buy?",
            choices: productIds
        }
        

    ]).then(function(answers){
        var selectedId = answers.product_id;
        if (selectedId === "exit"){
            process.exit();
        }
        
        // console.log(selectedId);
        var product = products.filter(function(product){
            if (product.id == selectedId){
                return product;
            }
        })[0];
        console.log(product);
        inquirer.prompt([
            {
                type: "input",
                name: "amount",
                message: "How many units of the product would you like to buy?",
                validate: function(input){
                    if (input <= product.stock_quantity){
                        return true;
                        
                    } else {
                        return false;
                    }
                }
            }
        ]).then(function(answers){
            var selectedAmount = parseInt(answers.amount);
            console.log(selectedAmount);
        })
    })

};




















// No code below