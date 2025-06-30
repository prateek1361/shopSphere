const express = require("express")
const app = express()
const { initializeDatabase } = require("./db/db.connect");
const Product = require("./models/productSchema")
const Category = require("./models/categorySchema")
const Wishlist = require("./models/wishlistSchema")
const Cart = require("./models/cartSchema")
const Address = require("./models/addressSchema")
const Order = require("./models/orderSchema")

app.use(express.json());

initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


async function getAllProducts() {
  try {
    return await Product.find();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
app.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
     if (products.length !== 0) {
            res.json(products);
        } else {
            res.status(404).json({ error: "No products found." });
        }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

async function getProductById(productId) {
  try {
    return await Product.findById(productId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
app.get("/products/:productId", async (req, res) => {
    try {
        const products = await getproductsById(req.params.productId);
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products." });
    }
});



async function getAllCategories() {
  try {
    return await Category.find();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
     if (categories.length !== 0) {
            res.json(categories);
        } else {
            res.status(404).json({ error: "No categories found." });
        }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories." });
  }
});

async function getCategoryById(categoryId) {
  try {
    return await Category.findById(categoryId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
app.get("/categories/:categoryId", async (req, res) => {
    try {
        const categories = await getcategoriesById(req.params.categoryId);
        res.json(categories)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories." });
    }
});

app.get("/wishlist", async (req, res) => {
  try {
    const items = await Wishlist.find().populate("productId");
    res.json(items.length ? items : []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlist items." });
  }
});


app.post("/wishlist/add", async (req, res) => {
  try {
    const { productId } = req.body;
    const existingItem = await Wishlist.findOne({ productId });

    if (existingItem) {
      return res.status(400).json({ error: "Product already in wishlist." });
    }

    const newItem = new Wishlist({ productId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to wishlist." });
  }
});



app.delete("/wishlist/:id", async (req, res) => {
  try {
    const deletedItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Wishlist item not found." });
    }
    res.json({ message: "Item removed from wishlist." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from wishlist." });
  }
});





app.get("/cart", async (req, res) => {
  try {
    const items = await Cart.find().populate("productId");
    res.json(items.length ? items : []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items." });
  }
});


app.post("/cart/add", async (req, res) => {
  const { productId } = req.body;

  try {
    const existingItem = await Cart.findOne({ productId });
    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newItem = new Cart({ productId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart." });
  }
});


app.delete("/cart/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from cart." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from cart." });
  }
});





app.get("/addresses", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses.length ? addresses : []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch addresses." });
  }
});


app.post("/addresses/add", async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: "Failed to add address." });
  }
});


app.delete("/addresses/:id", async (req, res) => {
  try {
    const deleted = await Address.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Address not found." });
    res.json({ message: "Address removed." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address." });
  }
});




app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders.length ? orders : []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});



app.post("/orders/place", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Order Save Error:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
});





const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})