const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controllers");


router.post('/login', ()=>{console.log("Rota de login")});
router.put('/:id', usuariosController.atualizarusuario);
router.post('/', ()=>{console.log("Rota de cadastrar")});

module.exports = router;