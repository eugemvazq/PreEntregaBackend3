import express from 'express';
import authController from '../../controllers/authController.js';
import passport from 'passport';

const router = express.Router();

/**
 * @swagger
 * /api/sessions/login:
 * post:
 * summary: Iniciar sesión de usuario.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * responses:
 * 200:
 * description: Sesión iniciada exitosamente. Devuelve el token JWT en una cookie y en el cuerpo.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * 401:
 * description: Credenciales inválidas.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * 404:
 * description: Usuario no encontrado.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * 500:
 * description: Error del servidor.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/sessions/register:
 * post:
 * summary: Registrar un nuevo usuario.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * firstName:
 * type: string
 * lastName:
 * type: string
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * responses:
 * 201:
 * description: Usuario registrado exitosamente. Devuelve el token JWT en una cookie y en el cuerpo.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * 400:
 * description: El usuario ya existe.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * 500:
 * description: Error al registrar usuario.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/sessions/current:
 * get:
 * summary: Obtener el usuario actual autenticado.
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Información del usuario actual.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * firstName:
 * type: string
 * lastName:
 * type: string
 * email:
 * type: string
 * 401:
 * description: No autorizado. Token JWT inválido o ausente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * 500:
 * description: Error del servidor.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 */
router.get('/current', passport.authenticate('jwt', { session: false }), authController.getCurrentUser);

export default router;