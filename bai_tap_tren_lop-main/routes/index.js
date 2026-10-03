const express = require('express');
const productController = require('../controllers/productController');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.get('/', productController.getHomePage);
router.get('/about', pageController.about);
router.get('/contact', pageController.contact);

module.exports = router;