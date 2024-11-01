const express = require('express');

validateFields = async (req,res,next) => {
    try{
        const allowedFields = ['firstName','lastName','about','id'];
        let isValid = Object.keys(req.body).every((field) => allowedFields.includes(field));
        if(isValid){
            next();
        }else{

            throw new Error("Can't modify all fields");
        }
    }catch(err){    
        console.error(`Error Encountered: ${err.message}`)
        res.status(400).send(`Error Encountered`)
    }

}



module.exports = {
    validateFields,
}