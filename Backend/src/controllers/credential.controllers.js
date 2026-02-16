const credentialModel = require("../models/credential.model");

async function createCredential(req, res) {
  const { website, password, username } = req.body;

  // i will done password ecryption later

  await credentialModel.create({
    user: req.user.id,
    website,
    username,
    password,
  });

  res.status(201).json({
    message: "credential save successfully",
  });
}



async function getAllCredential(req, res) {
  const credentials = await credentialModel
    .find({
      user: req.user.id,
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "all credential fetch successfully",
    credentials,
    count: credentials.length,
  });
}




async function deleteCredential(req, res) {
  try {
    const id = req.params.id;

    const credential = await credentialModel.findOneAndDelete({
      _id : id,
      user : req.user.id       // mongodb convert string to objectID | check ownership
    });

   if(!credential){
    return res.status(404).json({                // 404 | may not authorised user 403 
        message: 'credential not found'
    })
   }

   
    res.status(200).json({
      message: "Credential Delete successfully",
      credential
    });



  } catch (err) {
    return res.status(500).json({
      message: "Internal server error, try Again",
    });
  }


}


async function updateCredential(req , res) {
    const id = req.params.id

    const allowedField = ['website' , 'username' ,'password']
    const update ={}

    Object.keys(req.body).forEach((key) =>{

        if( allowedField.includes(key) )
        update[key] = req.body[key]
    })
   


    const updated = await credentialModel.findOneAndUpdate(
        {
            _id : id,
            user : req.user.id
        },
        update,
        {
            new : true,                          // return updated doc
            // runValidators : true 
        }
    ) 


    if(!updated){
        return res.status(404).json({
            message : 'credential not found'
        })
    }

    res.status(200)
    .json({
        message: 'credential updated successfully'
    })

}








module.exports = {
  createCredential,
};
