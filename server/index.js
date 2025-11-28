const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes'); 
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const path = require('path'); 
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'shopverse-blush.vercel.app', 
  credentials: true 
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount the Product Routes
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes); 
app.use('/api/upload', uploadRoutes);

app.get('/api/config/stripe', (req, res) => {
    res.send(process.env.STRIPE_PUBLISHABLE_KEY);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});