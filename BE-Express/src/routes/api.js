const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');
const customerController = require('../controllers/customerController');

// GET Route
router.get('/', exampleController.getExamples);
router.get('/customers', customerController.getAllCustomers);

// POST Route
router.post('/customers', customerController.addCustomer);

// PUT Route
router.put('/customers/:id', customerController.updateCustomer);

// DELETE Route
router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;