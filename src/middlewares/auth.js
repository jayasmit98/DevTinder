const adminAuth = (req,res,next)=>{
	if(req.params.user === 'user'){
		console.log("User validated");
		next();
	}else if(req.params.user === 'admin'){
		console.log("Admin Validated");
		next();
	}else{
		console.error("Not Authorized");
		res.status(401).redirect("/");
	}
}

module.exports={
    adminAuth,
}