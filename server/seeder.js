const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();
connectDB();

const sampleProducts = [
  {
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    description: 'Industry-leading noise canceling with two processors controlling eight microphones.',
    category: 'Audio',
    price: 349.99,
    countInStock: 15,
    rating: 4.5,
    numReviews: 4,
  },
  {
    name: 'Apple AirPods Pro (2nd Gen)',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=500&q=80',
    description: 'Rich audio. Next-level Active Noise Cancellation and Adaptive Transparency.',
    category: 'Audio',
    price: 249.99,
    countInStock: 0,
    rating: 4.8,
    numReviews: 12,
  },
  {
    name: 'Dell UltraSharp 4K Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80',
    description: 'Experience captivating details and true-to-life color reproduction.',
    category: 'Computers',
    price: 699.99,
    countInStock: 3,
    rating: 4.3,
    numReviews: 2,
  },
  {
    name: 'Sony Alpha a7 IV',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
    description: 'The basic is never basic. Prepare to be inspired. The true hybrid camera.',
    category: 'Cameras',
    price: 2498.99,
    countInStock: 2,
    rating: 4.9,
    numReviews: 3,
  },
  {
    name: 'Apple Watch Series 9',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80',
    description: 'Smarter. Brighter. Mightier. The most advanced health sensors yet.',
    category: 'Wearables',
    price: 399.99,
    countInStock: 12,
    rating: 4.2,
    numReviews: 4,
  },
  {
    name: 'PlayStation 5 Controller',
    image: 'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&w=500&q=80',
    description: 'Discover a deeper, highly immersive gaming experience.',
    category: 'Gaming',
    price: 69.99,
    countInStock: 18,
    rating: 4.9,
    numReviews: 30,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();

    const adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      console.error('Error: No Admin user found. Please register a user and make them admin first.');
      process.exit(1);
    }


    const sampleProductsWithUser = sampleProducts.map((product) => {
      return { ...product, user: adminUser._id };
    });


    await Product.insertMany(sampleProductsWithUser);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();