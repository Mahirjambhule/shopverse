const express = require('express');
const router = express.Router();
const { authUser, registerUser, logoutUser, getUsers, deleteUser} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware'); 

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser); 
router.post('/auth', authUser);
router.post('/logout', logoutUser);

module.exports = router;