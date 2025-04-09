// app.js
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser'; 
import config from './config/config.js';
import sessions from './routes/api/sessions.js';
import carts from './routes/api/carts.js';
import initializePassport from './config/passport.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser()); 
app.use(session({ secret: config.jwtSecret, resave: false, saveUninitialized: true }));

// Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/sessions', sessions);
app.use('/api/carts', carts);

// Conexión a MongoDB
mongoose.connect(config.mongoURI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});