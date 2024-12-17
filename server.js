import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import playerRoutes from './routes/players.js';
import matchRoutes from './routes/matches.js';

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ranking_Data', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB: ranking_Data'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err.message));

// Rotas
app.use('/players', playerRoutes);
app.use('/matches', matchRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
