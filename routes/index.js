const express = require('express');
const router = express.Router();
const fs = require('fs');
var sha1 = require('sha1');

router.post('/resposta', function(req, res, next) {
    // var json = res.json(req.body);
    var number = req.body.numero_casas;
    var frase = req.body.msg;
    const num = number < 0 ? 26 : number
    let output = ''

    for (let i = 0; i < frase.length; i++) {
        const code = frase.charCodeAt(i)
        let c = ''

        if (code >= 65 && code <= 90) {
            c = String.fromCharCode((code - num) % 26)
        } else if (code >= 97 && code <= 122) {
            if (code - num < 97) {
                c = String.fromCharCode(code - num + 122 - 97 + 1)
            } else {
                c = String.fromCharCode(code - num)
            }
        } else {
            if (code === 32) {
                c = ' '
            } else if (code === 58) {
                c = String.fromCharCode(code)
            } else if (code === 46) {
                c = String.fromCharCode(code)
            }
        }
        output += c
    }

    var j = {
        "numero_casas": 5,
        "token": "775314f78e77894a0a293c06ff4a6e03aa2bd882",
        "cifrado": "nijfx bfsy yt gj zlqd. ofxts xfsyf rfwnf",
        "decifrado": output,
        "resumo_criptografico": sha1(output)
    }
    json = JSON.stringify(j);
    fs.writeFile('answer.json', json, 'utf8', function(error) {
        if (error) throw error;
        console.log('Arquivo criado');
    })

});


module.exports = router;