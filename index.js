const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const usuariosRoute = require("./routes/usuario.route");

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        "Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE";
    };
    next();
});

app.use("/usuarios", usuariosRoute);

module.exports = app;