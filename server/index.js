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
const allowedOrigins = [
  'shopverse-blush.vercel.app', 
  'https://shopverse-api-pjey.onrender.com',   
  'http://localhost:5173'        
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
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