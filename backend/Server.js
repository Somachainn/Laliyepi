const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const PiNetworkIntegration = require('../pi-integration');

// Purchase a product
router.post('/', async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const payment = await PiNetworkIntegration.createPayment(product, userId);
    res.json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
