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

app.use(cors({
  origin: 'https://shopverse-blush.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
const allowedOrigins = [
  'shopverse-blush.vercel.app', 
  'https://shopverse-api-pjey.onrender.com',   
  'http://localhost:5173'        
];


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

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