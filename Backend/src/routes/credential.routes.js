const express = require('express')
const protect = require('../middlewares/auth.middleware')
const {
    getAllCredential,
    createCredential,
    deleteCredential,
    updateCredential
} = require('../controllers/credential.controllers')



const credentialRouter = express.Router()



//   api/credential/   [protected]

credentialRouter.get('/' , protect , getAllCredential )

credentialRouter.post('/', protect, createCredential )

credentialRouter.delete('/:id', protect, deleteCredential )

credentialRouter.patch('/:id', protect, updateCredential )



module.exports = credentialRouter