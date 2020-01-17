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
		console.log(product)		
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

/*
sell/arrival sorting
by sell = /products?sortBy=sold&order=desc&limit=4
by arrival = /products?sortBy=createdAt&order=desc&limited=6
if no params are sent, then all products are returned

*/


const allProducts = (req,res)=> {
	let order = req.query.order ? req.query.order: 'asc' //check express req.query params for this on express website
	let sortBy = req.query.sortBy ? req.query.sortBy: '_id'
	let limit = req.query.limit ? parseInt(req.query.limit) : 6

	console.log(req)

	Products.find()
		.select("-photo") //photo's are too huge and will slow down the app so select them and we'll display them later
		.populate('category')
		.sort([[sortBy,order]])
		.limit(limit)
		.exec((err, product)=> {
			if(err) {
				res.status(400).json({err: 'products not found'})
			}
			res.status(200).json({product})
		})
}

const productRelated = (req,res)=> {
	let limit = req.query.limit ? parseInt(req.query.limit) : 6
	Products.find({_id: {$ne: req.product}, category:req.product.category}) //$ne in mongo means not including  --we're getting products related by category
								//in the above case, we aren't including the id of the current product because it's there
	.exec((err, products)=> {
		if(err) {
			throw err
			res.status(400).json({err: "no products in this category"})
		}
			res.status(200).json({products});
	})

}


//list all product categories

const listedCategories = (req,res)=> {
	Products.distinct('category',{},(err,categories)=> {
		if(err) {
			res.status(400).json({err: 'error fetching categories'})
		}
		res.status(200).json({categories});
	})
}

const productBySearch =(req,res)=> {
	  let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


//displaying the  photo route
const photo = (req,res,next) => {
	if(req.product.photo.data) { //req.product is available in the productId in the parameter
		res.set('Content-type',req.product.photo.contentType); //set the content type since the response is not to be in json
		return res.send(req.product.photo.data)
	}
	next();
}
module.exports = {	newProduct,
					allProducts,
					productById,
					read,
					removeProduct,
					productUpdate,
					productRelated,
					listedCategories,
					productBySearch	,
					photo
				}
