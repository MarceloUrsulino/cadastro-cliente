const router = require('express').Router()
const ClienteController = require('../controllers/ClienteController')


router.post('/cliente/cadastro', ClienteController.ClienteCreate)
router.get('/listar/cliente', ClienteController.listarCliente)

router.put('/atualizar/cliente/:id', ClienteController.editarCliente)


module.exports = router
