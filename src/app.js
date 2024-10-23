const express = require("express");
const {adminAuth} = require("./middlewares/auth")
const app = express();

app.all("/test/:user",adminAuth);


app.get("/test/:user",(req,res,next) =>{
	console.log("1st handler");
	next();
	// res.send(JSON.stringify(req.params));

},
(req,res,next) =>{
	console.log("2st handler");
	// res.send("this is the response from 2nd handler");
	next();
},
(req,res,next) =>{
	console.log("3rd handler");
	res.send("response from 3rd handler");
},
(req,res,next) =>{
	console.log(req.query);
	console.log(req.params.param1);
	res.send(JSON.stringify(req.params));
},

);

app.use("/practice",(req,res) =>{
	res.send("hello from the practice server");
});

app.use("/",(req,res) =>{
	res.send("hello from default server");
})




app.listen(3000,()=>{
	console.log("server has started on port 3000");
});

