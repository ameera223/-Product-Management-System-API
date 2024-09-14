const express = require('express');
const router = express.Router();
const { 
    getProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProduct
    } 
 = require('../controllers/products');

const { verifyTokenHandler, verifyRoles } = require('../middlewares/jwtHandler');

router.get('/', getProducts);

router.post('/',[verifyTokenHandler, verifyRoles(['admin'])],createProducts);


router.route('/:id').get(getProduct).put([verifyTokenHandler, verifyRoles(['admin'])],updateProduct).delete([verifyTokenHandler, verifyRoles(['admin'])],deleteProduct);


module.exports = router;