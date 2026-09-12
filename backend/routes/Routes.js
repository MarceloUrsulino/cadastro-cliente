const router = require('express').Router()
const ClienteController = require('../controllers/ClienteController')


router.post('/cliente', ClienteController.ClienteCreate)
router.get('/listar', ClienteController.listarCliente)


module.exports = router
