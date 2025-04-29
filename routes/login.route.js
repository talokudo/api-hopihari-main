const express = require("express");
const router = express.Router();

router.post('/login', ()=>{console.log("Rota de login")});

module.exports = router;