const { initializeDatabase } = require("./db/db.connect")
const fs = require("fs")
const Product = require("./models/productSchema")
const Category = require("./models/categorySchema")

initializeDatabase()



async function seedData() {
    try{


    const productJson = fs.readFileSync("./products.json", "utf-8");
    const categoryJson = fs.readFileSync("./category.json", "utf-8");

    const products = JSON.parse(productJson);
    const categories = JSON.parse(categoryJson);

    await Product.deleteMany({});
    await Category.deleteMany({});

    await Product.insertMany(products);
    await Category.insertMany(categories);

    console.log("Product and Category data seeded successfully");
        
    } catch (error) {
        console.log("Error seeding the data", error)
    }
}

seedData()