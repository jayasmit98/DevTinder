const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");

router.post('/login',async (req, res) => {
	try{		
		const {email, password} = req.body;
		const userDetails = await userSchema.findOne({email:email},{_id:1,password:1});
		console.log(userDetails);
		const validated = await userDetails.validatePassword(password);
		if(validated){
			
			const token = await userDetails.getJWT();
			res.cookie("token",token);
			
			res.status(200).send("Successfully logged in: Validated");
		}else{
			res.status(400).send("Validation failed");
		}
	}
	catch(err){
		res.status(400).send(`Error encountered: ${err}`);
	}
	
});

router.post("/createNew",async(req,res) => {
	console.log("triggering here");
	const {firstName, lastName, password, email, skills} = req.body;

	try{
	const encPassword = await bcrypt.hash(password, 10);
	const user = new userSchema({
		firstName,
		lastName,
		password:encPassword,
		email,
		skills
	});

	
		await user.save();
		res.send("User added successfully");
	}catch(err){
		if(err.code=== 11000){
			res.send(err.errmsg);
		}
		res.status(400).send(err._message);
	}
});

router.post("/logout", async (req,res) => {
	try{
		res.cookie("token", null, {
			expires:new Date(Date.now())
		});
		res.send("Logged out successfully");
	}catch(err){
		console.error("Error encountered: ",err.message)
		res.status(400).send(`Encountered error while logging out`);
	}
})


module.exports = router;