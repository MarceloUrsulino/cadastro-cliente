const cliente = require('../models/Cliente')
const axios = require('axios')

module.exports = class ClienteController{
    static async ClienteCreate(req,res){
        const { nome, email, cep, numero, complemento } = req.body


        if(!nome || !email || !cep || !numero){
            res.status(422).json({message: 'O campo precisa ser preenchido.'})
            return
        }

        //USANDO REPLACE PARA GUARDAR SOMENTE NUMEROS NA VARIAVEL
        const somenteNumeros = cep.replace(/\D/g, '')

        if(!cep || somenteNumeros.length !== 8){
            res.status(400).json({message: 'Por favor, utilize um cep válido.'})
            return
           }
        //USANDO TRY/ CATCH PARA TRATAR ERRO EXTERNO NA API
        try {

            //FAZENDO A REQUISIÇÃO EXTERNA PARA BUSCAR OS DADOS DO CEP
            const resposta = await axios.get(`https://viacep.com.br/ws/${somenteNumeros}/json/`)

            const dadosCep = resposta.data
        
            const rua = dadosCep.logradouro
            const bairro = dadosCep.bairro
            const cidade = dadosCep.localidade
            const estado = dadosCep.uf

            const create = await cliente.create({
            nome,
            email,
            cep,
            numero,
            complemento,
            rua,
            bairro,
            cidade,
            estado
        })
        res.status(201).json({message: 'Cadastro criado.'})
        return

        } catch (error) {

            res.status(400).json({message: 'Cep inválido.'})
            
        }
    }

}