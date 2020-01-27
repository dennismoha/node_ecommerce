//this is the product category section
const mongoose = require('mongoose');
// mongoose.connect("mmongodb+srv://admin:@$$mon254@admin-dzypr.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true})
// 	.then(()=> {
// 		console.log("successfully connected")
// 	})
// 	.catch((error)=>{
// 		console.log("connection unsuccessful")
// 		console.error(error);
// 	});

mongoose.connect('mongodb://localhost:27017/node_eccormece', {useNewUrlParser: true});

const categorySchema = new mongoose.Schema({
	name:{type: String, required:true, trim:true,maxLength: 32},
},{timestamps:true});

module.exports = mongoose.model('category',categorySchema)
