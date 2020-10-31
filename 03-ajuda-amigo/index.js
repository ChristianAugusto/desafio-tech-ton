const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');



const app = express();
const PORT = 3000;
const jsonParser = bodyParser.json();



app.post('/', jsonParser, async function(req, res) {
    try {
        console.log(`reqBody = ${JSON.stringify(req.body)}`);

        const { cep, cpf } = req.body;

        if (!cep) {
            res.status(400)
                .json({
                    message: 'Cep is not in body'
                })
        }

        if (!cpf) {
            res.status(400)
                .json({
                    message: 'CPF is not in body'
                })
        }

        const cleanCep = cep.replace(/\D/gmi, '');
        const cleanCpf = cpf.replace(/\D/gmi, '');


        let viacepResponse = null;


        try {
            const responseObj = await axios({
                method: 'GET',
                url: `https://viacep.com.br/ws/${cleanCep}/json/`,
                timeout: 10000 // 10 seg em ms
            });

            console.log(`viacepResponse = ${JSON.stringify(responseObj.data)}`);

            viacepResponse = responseObj.data;
        }
        catch (error) {
            console.log('Error in viacep API');
            console.log(error);

            res.status(500)
                .json({
                    message: 'Error in viacep API'
                })
            return;
        }


        const objToSave = {
            ...viacepResponse,
            cpf: cleanCpf
        };


        console.log(`Salvando no banco ${JSON.stringify(objToSave)}`)


        res.status(200)
            .json(objToSave);
    }
    catch (error) {
        console.log('Error in (POST)/');
        console.log(error);

        res.status(500)
            .json({
                message: 'Internal server error'
            })
    }
});


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
