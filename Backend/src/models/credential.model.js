const mongoose = require('mongoose')

const credentialSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    },
    website:{
        type : String,
        required: [true , 'website url or name is require']
    },
    username:{
        type : String,
        required: [true , 'username is required']
    },
    password:{
        type: String,
        required: [true , 'password is requied']
    }
    
},
{
    timestamps : true
})



const credentialModel = mongoose.model('credential', credentialSchema)

module.exports = credentialModel

