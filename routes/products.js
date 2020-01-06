const express = require('express');

const products = require('../controller/products');
const {requireSignin,isAuth,isAdmin} = require('../controller/auth');
const userbyId = require('../controller/userbyId');
const productRoute = express.Router();

productRoute.get('/',products.allProducts);
productRoute.post('/newProduct/:userbyId',requireSignin,products.newProduct)
productRoute.get('/productbyid/:productId', products.read);
productRoute.delete('/productbyid/:productId/:userbyId',requireSignin,isAuth,isAdmin, products.removeProduct)//make sure to include all the auth authentication here
productRoute.put('/productUpdate/:productId',products.productUpdate);//rem to include the auth configurations

productRoute.param('userbyId',userbyId.userById)
productRoute.param('productId',products.productById)

module.exports = productRoute;

