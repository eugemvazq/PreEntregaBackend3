import express from 'express';
import authController from '../../controllers/authController.js';
import passport from 'passport';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/current', passport.authenticate('jwt', { session: false }), authController.getCurrentUser);

export default router;