const mongoose = require("mongoose");

const connect = async() => {
    await mongoose.connect("mongodb+srv://jayasmit98:PCUA3PYP4p5YedXr@practice.gmwib.mongodb.net/devTinder");
};

module.exports = {
    connect,
}

// mongodb+srv://jayasmit98:PCUA3PYP4p5YedXr@practice.gmwib.mongodb.net/?retryWrites=true&w=majority&appName=Practice/devTinder