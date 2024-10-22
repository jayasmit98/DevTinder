const express = require("express");
const app = express();




app.use("/test",(req,res) =>{
	res.send("hello from the test server");
});

app.use("/practice",(req,res) =>{
	res.send("hello from the practice server");
});

app.use("/",(req,res) =>{
	res.send("hello from default server");
})




app.listen(3000,()=>{
	console.log("server has started on port 3000");
});

