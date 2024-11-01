const express = require("express");
const router = express.Router();
const users = require("../models/user");


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

module.exports = router;