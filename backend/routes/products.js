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
productRoute.get('/relatedProduct/:productId',products.productRelated)//lists related products in a certain category
productRoute.get('/product/categories',products.listedCategories) //lists all products categories
productRoute.post('/product/by/search',products.productBySearch);
productRoute.get('/product/photo/:productId',products.photo);//displaying the photo route

productRoute.param('userbyId',userbyId.userById)
productRoute.param('productId',products.productById)

module.exports = productRoute;

