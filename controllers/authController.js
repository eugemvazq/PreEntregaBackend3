import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';
import config from '../config/config.js';

export default {
    // Iniciar sesión
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Buscar el usuario por email
            const user = await UserRepository.loginUser(email);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Verificar la contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Crear el payload del token JWT
            const payload = { user: { id: user._id } };

            // Generar el token JWT
            jwt.sign(
                payload,
                config.jwtSecret,
                { expiresIn: 360000 }, // El token expira en 100 horas (para desarrollo)
                (err, token) => {
                    if (err) throw err;

                    // Enviar el token en una cookie
                    res.cookie('jwt', token, { httpOnly: true, secure: false }); // secure: true en producción (HTTPS)
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error del servidor');
        }
    },

    // Obtener el usuario actual
    getCurrentUser: async (req, res) => {
        try {
            // Obtener el usuario desde el repositorio
            const user = await UserRepository.getCurrentUser(req.user.id);

            // Enviar la respuesta con el usuario
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error del servidor');
        }
    },

    // Registrar un nuevo usuario
    register: async (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        try {
            // Verificar si el usuario ya existe
            const existingUser = await UserRepository.loginUser(email);
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            // Crear un nuevo usuario
            const newUser = await UserRepository.registerUser({
                firstName,
                lastName,
                email,
                password
            });

            // Crear el payload del token JWT
            const payload = { user: { id: newUser._id } };

            // Generar el token JWT
            jwt.sign(
                payload,
                config.jwtSecret,
                { expiresIn: 360000 }, // El token expira en 100 horas (para desarrollo)
                (err, token) => {
                    if (err) throw err;

                    // Enviar el token en una cookie
                    res.cookie('jwt', token, { httpOnly: true, secure: false }); // secure: true en producción (HTTPS)
                    res.status(201).json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error al registrar usuario');
        }
    }
};