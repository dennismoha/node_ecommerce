const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema //needed where the productschema is to read from the category schema
								//helps in relation from one model to another model
// mongoose.connect("mmongodb+srv://admin:@$$mon254@admin-dzypr.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true})
// 	.then(()=> {
// 		console.log("successfully connected")
// 	})
// 	.catch((error)=>{
// 		console.log("connection unsuccessful")
// 		console.error(error);
// 	});

mongoose.connect('mongodb://localhost:27017/node_eccormece', {useNewUrlParser: true});



const productsSchema = new mongoose.Schema({
	name:{type: String, required:true, trim:true, maxLength:32},
	description: {type:String, required:true, trim:true},
	price: {type: Number,  required:true, maxLength:32},
	category: {type:  mongoose.Schema.Types.ObjectId, ref:'category',required:true},
	quantity: {type: Number , required:true, required: true},
	sold:{type: Number, default: 0},
	photo: { data: Buffer, contentType: String},
	shipping:{required: false, type: Boolean}
},{timestamps:true});

module.exports = mongoose.model('products',productsSchema);