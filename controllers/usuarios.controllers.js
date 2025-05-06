const mysql = require('../routes/mysql.js'); // ajuste o caminho se necessário
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Atualizar usuário
exports.atualizarUsuario = async (req, res) => {
    try {
        const idUsuario = Number(req.params.id);

        const resultado = await mysql.execute(
            `
            UPDATE users
            SET name = ?,
                email = ?,
                password = ?
            WHERE id = ?
            `,
            [
                req.body.name,
                req.body.email,
                req.body.password,
                idUsuario
            ]
        );

        return res.status(200).send({ "mensagem": "Usuário atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).send({ "mensagem": error.message });
    }
};

// Inserir novo usuário
exports.cadastro = async (req, res) => {
    try {
        const { first_name, last_name, email, password, birth_date, phone } = req.body;
        const hash = await bcrypt.hash(req.body.password, 10);
        const resultado = await mysql.execute(`
            INSERT INTO usuario (first_name, last_name, email, password, birth_date, phone) VALUES (?, ?, ?, ?, ?, ?);`, [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.password,
            req.body.birth_date,
            req.body.phone
        ]
        );

        return res.status(201).send({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).send({ mensagem: error.message });
    }
};




exports.login = async (req, res) => {
    try {
        const usuario = await mysql.execute("SELECT * FROM users WHERE email = ?", [req.body.email]);       
        console.log(usuario);

        if (usuario.length == 0) {
            return res.status(401).send({ "mensagem": "Falha na autenticação!" });
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        console.log(hash);

        const match = await bcrypt.compare(usuario[0].password, req.body.password);
        console.log(match, req.body.password, usuario[0].password);

        if (!match) {
            return res.status(401).send({ "mensagem": "senha errada!" });
        }

        console.log(match);

        const token = jwt.sign({
            id: usuario[0].id,
            first_name: usuario[0].first_name,
            last_name: usuario[0].last_name,
            email: usuario[0].email,
            birth_date: usuario[0].birth_date,
            phone: usuario[0].phone

        }, "senhajwt");

        return res.status(200).send({
            "mensagem": "Autenticado com sucesso!",
            "token": token,
        });



    } catch (error) {
        return res.status(500).send({ "error": error });
    }
}