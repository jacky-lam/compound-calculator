import express from 'express';
import calculateRouter from './calculate/calculateRouter';

const apiRouter = express.Router();

apiRouter.use('/calculate', calculateRouter);

export default apiRouter;
