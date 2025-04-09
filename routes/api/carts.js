import express from 'express';
import { purchaseCart } from '../../controllers/cartController.js';
import passport from 'passport';

const router = express.Router();

router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), purchaseCart);

export default router;