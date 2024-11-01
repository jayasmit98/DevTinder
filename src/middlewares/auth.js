const jwt = require("jsonwebtoken");
const user = require("../models/user");

const adminAuth = async (req,res,next)=>{
	try{
		console.log("Coming here?")
		const {token} = req.cookies;
		if(!token){
		console.error("Token not found")
		throw new Error('Error in token');
	}

	const id = await jwt.verify(token, 'devTinder2505');
	if(!id){
		console.error("Problem in verifying token")
		throw new Error('Error in token')
	}
	const userData = await user.findById(id);
	req.user = userData;
	next();}
	catch(err){
		console.log("error encountered?");
		res.status(400).send('Error encountered')
	}
}

module.exports={
    adminAuth,
}