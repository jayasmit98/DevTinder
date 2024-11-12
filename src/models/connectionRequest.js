const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is invalid status type`
        }
    },
    
},
{
    timestamps:true,
}
);



module.exports = connectionRequestSchema.model('connectionRequest', connectionRequestSchema);