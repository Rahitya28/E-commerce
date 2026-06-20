require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function seedProducts() {
  try {
    // Check if products already exist
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} products. Skipping seed.`);
      process.exit(0);
    }

    console.log('Fetching products from Fake Store API...');
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    // Map to our model (though the fields happen to match)
    const productDocs = products.map(p => ({
      title: p.title,
      price: p.price,
      category: p.category,
      image: p.image
    }));

    await Product.insertMany(productDocs);
    console.log(`Successfully seeded ${productDocs.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
