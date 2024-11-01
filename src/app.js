const express = require("express");
const compression = require('compression');
const cookieParser = require("cookie-parser");
const {adminAuth} = require("./middlewares/auth");
const {connect} = require("./config/database");
const router = require("./route");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // to make the application recognise json format.
app.use(cookieParser());


app.use(compression());
app.use("/", router);

// app.post("/createNew")

// app.use("/", adminAuth, profileRoutes);


connect().then(() =>{
	console.log("Successfully connected to mongodb database");
	app.listen(PORT,()=>{
		console.log("Server is listening on port 3000");
	})
}).catch((err) =>{
	console.error("Error in connecting with database");
});


// app.listen(3000,()=>{
// 	console.log("server has started on port 3000");
// });

