const Category = require('../models/category');

//creating a new category
const newCategory =(req,res)=> {
	const category = new Category(req.body);
	category.save((err,categoryData)=> {
		if(err) {
			res.status(400).json({
				err: "Unsuccessful category creation"
			})
		}
		res.status(201).json({categoryData})
	})
}

//displaying all the categories
const category = (req,res)=> {
	Category.find().then((categories)=> {
		res.status(200).json({categories})
	}).catch((Err)=>{
		throw err
	})
}

//finding a specific category by id
const categoryById =(req,res,next,id)=> {
	Category.findById(id).exec((err,category)=> {
		if(err || !category) {
			res.status(400).json({
				message: "that category doesn't exist"
			})
		}
		req.category = category;
		console.log('this is the request category',req.category)
		next()
	})
}

//displays that one category found by id
const oneCategory = (req,res)=> {
	
	return res.json(req.category)
}

//update a specific category
const categoryUpdate = (req,res)=> {
	const category = req.category
	category.name = req.body.name;
	category.save().then((category)=> {
		res.status(201).json({message: "categories successfully saved"})
	}).catch((error)=>{
		throw error;
	})
}

// const categoryUpdate =(req,res) =>{
// 	const category = req.category
// 	category.name = req.body.name
// 	category.save((err,category)=> {
// 		if(err) {
// 			throw err
// 		}
// 		res.send('category succesfully updated')
// 	})
// }

//remove a specific category
const categoryRemove = (req,res)=> {
	const category = req.category;
	category.remove().then((category)=> {
		res.status(200).json({message: "category successfully removed"})
	}).catch((error)=> {

		res.status(400),json({error: "Error in removing category "})
	})

}

module.exports = {category,newCategory,categoryById,oneCategory,categoryUpdate,categoryRemove}