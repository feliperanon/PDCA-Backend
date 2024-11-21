require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Configuração do Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Use as variáveis de ambiente
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
    console.error('Credenciais Twilio não configuradas corretamente.');
    process.exit(1);
}

const client = twilio(accountSid, authToken);

// Rota de exemplo para enviar notificações
app.post('/api/sendNotification', async (req, res) => {
    const { responsible, message } = req.body;

    try {
        await client.messages.create({
            from: 'whatsapp:+14155238886', // Número do WhatsApp Twilio
            to: `whatsapp:${responsible}`,
            body: message,
        });

        res.status(200).json({ message: 'Notificação enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        res.status(500).json({ error: 'Erro ao enviar notificação.' });
    }
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
