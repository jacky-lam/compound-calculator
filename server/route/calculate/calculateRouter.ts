import express from 'express';
import compoundInterest from './compoundInterest';

const calculateRouter = express.Router();

calculateRouter.use(compoundInterest);

export default calculateRouter;
