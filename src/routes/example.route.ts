import express from 'express';
import { getExample, postExample } from '../controllers/example.controller';

const router = express.Router();

router.get('/example', getExample);
router.post('/example', postExample);

export default router;
