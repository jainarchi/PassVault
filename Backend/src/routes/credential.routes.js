const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const {
    getAllCredential,
    createCredential,
    deleteCredential,
    updateCredential
} = require('../controllers/credential.controllers')



const credentialRouter = express.Router()



//   api/credential/   [protected]

credentialRouter.get('/' , identifyUser , getAllCredential )

credentialRouter.post('/', identifyUser, createCredential )

credentialRouter.delete('/:id', identifyUser, deleteCredential )

credentialRouter.patch('/:id', identifyUser, updateCredential )



module.exports = credentialRouter