const express = require("express");
const router = express.Router();
const users = require("../models/user");
const {validateFields} = require('../middlewares/util');

router.get("/getUsers", async(req,res) => {
    try{		
        let usersData = await users.fetchUsers();
		console.log(usersData);
		res.send(usersData);		
	}catch(err){
		console.error(err);
		res.status(400).send("Can't fetch database at the moment");
	}
})

router.patch('/edit', validateFields, async (req, res)=> {
	try{
		await users.findOneAndUpdate({_id:req.body.id},{$set:req.body});
		res.status(200).send("Successfully updated");
	}catch(err){
		console.error(`Error Encountered: ${err}`);
		res.status(400).send("Error in updating record");
	}
})


module.exports = router;