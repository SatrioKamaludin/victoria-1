const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');
const customerController = require('../controllers/customerController');

// GET Route
router.get('/', exampleController.getExamples);
router.get('/customers', customerController.getAllCustomers);

module.exports = router;