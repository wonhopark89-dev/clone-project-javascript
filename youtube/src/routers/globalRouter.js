import express from 'express';
import { trending } from '../controllers/videoController';
import { join } from '../controllers/userController';
// global route
const globalRouter = express.Router();

globalRouter.get('/', trending);
globalRouter.get('/join', join);

export default globalRouter;
