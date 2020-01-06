const Products = require('../models/products');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); //nodejs module that helps us read the file system


//getting a new product by id
 const productById = (req,res,next,id)=> {
	Products.findById(id).exec((err,product)=> {
		if(err) {
			res.status(400).json({
				err: "product not found"
			})
		}		
		req.product = product;		
		next();
	})
}

//read /display the product by id and make the product photo undefined in this case 
const read = (req,res)=> {
	 req.product.photo = undefined;	 
	 return res.json(req.product);
}

//deleting a specific product

const removeProduct=(req,res)=>{
	let product = req.product;
	Products.remove((err, product)=>{
		if(err) {
			throw err
		}
		res.status(200).json({
			message:"product removed successfully"
		})
	})
}


//creating a new product
const newProduct = (req,res) =>{
	let form = new formidable.IncomingForm()
	form.keepExtensions = true; //makes it upload any type of picture
	form.parse(req, (err,fields,files)=> {
		if(err) {
			throw err
			//return res.status(400).json({err: 'image could not be uploaded'})
		}

	const{name,description,price,category,quantity,shipping} = fields;
	const {photo } = files;
	if(!photo) {
		res.json({err : "photo is required"})
	}
	if ( !name || !description || !price || !category || !quantity   || !shipping) {
		res.json({err : "All fields are required"})
	}

	let product = new Products(fields)
	

	if(files.photo) { //here name photo depends on what you name the field on the user side
		if(files.photo.size > 10000000000 ) {
			res.status(400).json({message: "image must be less than 1mb"})
		}
		product.photo.data = fs.readFileSync(files.photo.path)
		product.photo.contentType = files.photo.type
	}

	product.save().then((product)=> {
		res.status(201).json({message: 'new product saved'})
	}).catch((err)=> {
		throw err
		res.status(400).json({
			Error: "error in adding new product"
		})
	})

	})

	
}


//update a product
const productUpdate = (req,res)=> {
	let form = new formidable.IncomingForm()
	form.keepExtensions = true; //makes it upload any type of picture
	form.parse(req, (err,fields,files)=> {
		if(err) {
			throw err
			//return res.status(400).json({err: 'image could not be uploaded'})
		}

	const{name,description,price,category,quantity,shipping} = fields;
	const {photo } = files;
	
	
	let product = req.product
	product = _.extend(product, fields)//here we used lodash

	if(files.photo) { //here name photo depends on what you name the field on the user side
		if(files.photo.size > 10000000000 ) {
			res.status(400).json({message: "image must be less than 1mb"})
		}
		product.photo.data = fs.readFileSync(files.photo.path)
		product.photo.contentType = files.photo.type
	}

	product.save().then((product)=> {
		res.status(201).json({message: 'product update successfull'})
	}).catch((err)=> {
		throw err
		res.status(400).json({
			Error: "error in updating the product"
		})
	})

	})

}



// const allProducts = (req,res) =>{
// 	Products.find().then((product)=> {
// 		console.log(product[0]._id);
// 		product.forEach()
// 		res.status(200).send(product[0]._id)
// 	}).catch((err)=>{
// 		res.status(400).json({
// 			err: "error getting all the products"
// 		})
// 	})
// }


//dummy route for getting the id of a product.
// const allProducts = (req,res) =>{
// 	Products.find().then((product)=> {
// 		console.log(product[0]);
// 		product.forEach(productFunction)
// 		function productFunction(e,i,product) {
// 			product[i].photo = undefined;
// 			res.status(200).send(product[i])
// 		} 
		
// 	}).catch((err)=>{
// 		res.status(400).json({
// 			err: "error getting all the products"
// 		})
// 	})
// }

const allProducts =(req,res)=> {
	Products.find().then((product)=> {
		product[0].photo = undefined
		res.status(200).json({product})
	}).catch((error)=> {
		throw error;
	})
}


module.exports = {newProduct,allProducts,productById,read,removeProduct,productUpdate}
