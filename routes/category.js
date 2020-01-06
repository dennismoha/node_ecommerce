const express = require('express');


const category = require('../controller/category')
const {requireSignin,isAuth,isAdmin} = require('../controller/auth');
const userbyId = require('../controller/userbyId');
const cateRoute = express.Router();




cateRoute.get('/allcategory',category.category)
cateRoute.post('/create/:userId',requireSignin,isAuth,category.newCategory)
cateRoute.get('/oneCategory/:categoryId',category.oneCategory)
cateRoute.put('/categoryUpdate/:categoryId',category.categoryUpdate);
cateRoute.delete('/categoryRemove/:categoryId',category.categoryRemove)

cateRoute.param('categoryId',category.categoryById)
cateRoute.param('userbyId',userbyId.userById)
module.exports = cateRoute