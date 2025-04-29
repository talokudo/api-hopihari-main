const mysql = require('../mysql');


exports.atualizarusuario = async (req, res) => {
    try{
const idUsuario = Number(req.params.id);
const resultado = await mysql.execute(
    `update users

set name   = ?,
email      = ?,
password   = ?
where id   = ?;`,
[
    req.body.nome, 
    req.body.email,
    req.body.password,
    idUsuario
]

);
return res.status(201).send({"mensagem": "Usuario atualizado com sucesso!",
    "resultado": resultado
    
});
    } catch (error) {
        return res.status(500).send({"mensagem": error});
 }
}