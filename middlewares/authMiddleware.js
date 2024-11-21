const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ error: 'Token não fornecido' });

    jwt.verify(token, 'SECRETO', (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;