import express from 'express';
import itemController from '../controllers/itemController.js';

const router = express.Router();

router.get('/:id', itemController.getItemDetails);

export default router;
