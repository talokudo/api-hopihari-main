const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controllers");

// Rota para login
router.post('/login', usuariosController.login);

// Rota para atualizar usuário
router.put('/:id', usuariosController.atualizarUsuario); // Corrigido para "atualizarUsuario"

// Rota para cadastrar usuário
router.post('/', usuariosController.cadastro); 

module.exports = router;