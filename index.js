const express = require('express');
const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

// Rotas
const routes = require('./routes/routes');
app.use('/api', routes);

// Porta
const PORT = process.env.PORT || 3000;

// MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Database Connected');

    // Só inicia o servidor depois de conectar
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });

})
.catch((error) => {
    console.log(error);
});