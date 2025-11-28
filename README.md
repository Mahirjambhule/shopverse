# ShopVerse 🛒

**ShopVerse** is a fully functional, full-stack E-Commerce platform built with the MERN stack. It features a modern UI, secure payments, an admin dashboard, and robust product management.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![Stripe](https://img.shields.io/badge/Stripe-Payments-violet)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4)

---

## 🚀 Live Demo

Check out the live application running in production:

- **Frontend (Storefront):** [https://shopverse-blush.vercel.app](https://shopverse-blush.vercel.app)
- **Backend (API):** [https://shopverse-api-pjey.onrender.com](https://shopverse-api-pjey.onrender.com)

---

## ✨ Features

### 🛍️ For Shoppers
- **Product Browsing:** Filter by category, search by keyword, and pagination.
- **Product Details:** High-quality images, descriptions, stock status, and related reviews.
- **Shopping Cart:** Add/Remove items and adjust quantities with persistent state (Redux).
- **Secure Checkout:** Multi-step checkout process (Shipping -> Payment -> Order).
- **Stripe Integration:** Secure credit card payments using Stripe API (Test Mode).
- **User Accounts:** Sign up, login, and manage profile/order history.
- **Reviews:** Rate and review products.

### ⚙️ For Admins
- **Admin Dashboard:** Centralized control panel.
- **Product Management:** Create, Update, and Delete products.
- **Image Upload:** Drag-and-drop image uploading powered by **Cloudinary**.
- **User Management:** View all users and delete accounts.
- **Order Management:** View all orders and track payment/delivery status.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Redux Toolkit (State Management)
- Tailwind CSS (Styling)
- React Router DOM
- Axios
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) for Authentication
- BcryptJS (Password Hashing)
- Multer & Cloudinary (Image Storage)

**DevOps & Deployment:**
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🔧 Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env` file in the `server` folder:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


## 💻 Run Locally

Follow these steps to set up the project locally on your machine.

**1. Clone the repository**

```bash
git clone [https://github.com/YOUR_USERNAME/shopverse.git](https://github.com/YOUR_USERNAME/shopverse.git)
cd shopverse
```
