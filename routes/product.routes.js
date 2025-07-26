const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');

//rutas

router.post('/', productCtrl.createProduct);
router.get('/', productCtrl.getProducts);
router.get('/:id', productCtrl.getProductById);
router.patch('/:id', productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);
router.post('/:id/reviews', productCtrl.addReview);


module.exports = router;