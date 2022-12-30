// importando e rodadndo o express
import express from "express";

// conexao com o mongodb
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        // se logar com o banco roda o API.
        const app = express();
        // saida para o navegador
        const port = 3001;
        app.listen(port, () => {
            console.log(`servidor rodando no http://localhost:${port}`);
        });
    })
    .catch((err) => console.log("algo deu errado - " + err));


// rotas:


