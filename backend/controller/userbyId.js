 const User = require('../models/user');

 const userById = (req,res,next, id)=> {
 	User.findById(id).exec((err,user)=>{
 		if(err || !user) {
 			console.log('user not found')
 			res.status(400).json({
 				message: 'user not found'
 			})
 		}
 		req.profile = user; // here we're feeding req.profile with the user details
 		next();
 	})
 }

//update user profile
const updateProfile = (req,res)=> {
	User.findOneAndUpdate({_id: req.profile._id},{$set: req.body},{new:true},(err,user)=> {
		if(err) {
			return res.status(400).json({err: 'not authorized to perform this'})
		}
		User.hashed_password = undefined
		res.json({user});
	})
}

//read user profile
const profile =(req,res)=> {
	req.profile.hashed_password = undefined;
	return res.json(req.profile);
}

 module.exports={userById,updateProfile,profile}