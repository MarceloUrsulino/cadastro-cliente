const cliente = require('../models/Cliente')
const axios = require('axios')

module.exports = class ClienteController{
    static async ClienteCreate(req,res){
    try{
        const { nome, email, cep, numero, complemento } = req.body

        if(!nome || !email || !cep || !numero){
            res.status(422).json({message: 'O campo precisa ser preenchido.'})
            return
        }

        const emailCheck = await cliente.findOne({where: {email: email}})
        
        if(emailCheck){
            res.status(422).json({message:'O e-mail já existe no cadastro, por favor insira outro e-mail.' })
            return
        }

        //USANDO REPLACE PARA GUARDAR SOMENTE NUMEROS NA VARIAVEL
        const somenteNumeros = cep.replace(/\D/g, '')

        if(somenteNumeros.length !== 8){
            res.status(400).json({message: 'Por favor, utilize um cep válido.'})
            return
           }

        let rua, bairro, cidade, estado
        //USANDO TRY/ CATCH PARA TRATAR ERRO EXTERNO NA API
        try {

            //FAZENDO A REQUISIÇÃO EXTERNA PARA BUSCAR OS DADOS DO CEP
            const resposta = await axios.get(`https://viacep.com.br/ws/${somenteNumeros}/json/`)

            const dadosCep = resposta.data

            if(dadosCep.erro){
                res.status(400).json({message: 'Cep não encontrado.'})
                return
            }
        
             rua = dadosCep.logradouro
             bairro = dadosCep.bairro
             cidade = dadosCep.localidade
             estado = dadosCep.uf

        }catch(error) {
  
            res.status(400).json({message: 'Cep inválido.'})
            return
        }

            await cliente.create({
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
      
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro ao tentar cadastrar.'})
    } 
}  

    //FUNÇÃO LISTAR/ GET
    static async listarCliente(req,res){
    try{
        const lista = await cliente.findAll()
        res.status(200).json(lista)
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro ao tentar listar.'})
    }
}
    //FUNÇÃO ATUALIZAR
    static async editarCliente(req,res){
    try{
        const id = req.params.id
        const checkCliente = await cliente.findByPk(id)
        if(!checkCliente){
            res.status(422).json({message: 'Cliente não encontrado.'})
            return
        }
        const { nome, email, cep, numero, complemento } = req.body

        await checkCliente.update({nome, email, cep, numero, complemento})
        res.status(200).json({message: 'Cadastro atualizado.'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro ao tentar atualizar.'})
    }
}

    //FUNÇÃO DELETAR
    static async deletarCliente(req,res){
    try{
        const id = req.params.id
        const check = await cliente.findByPk(id)
        if(!check){
            res.status(422).json({message: 'Cadastro não encontrado.'})
            return
        }

        await check.destroy()
        res.status(200).json({message: 'O cadastro foi excluído.'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro ao tentar deletar.'})
    }
}

}