import Ajv, { JSONSchemaType } from 'ajv';
import express, { Request, Response } from 'express';
import {
    CompoundInterestRatesInput,
    getCompoundInterestRates,
    interestRateTypes,
} from '../../calculations/compoundInterestRates';

const pathName = 'compound-interest';

const calculateRouter = express.Router();
const ajv = new Ajv();

type RequestQuery = CompoundInterestRatesInput;

const schema: JSONSchemaType<RequestQuery> = {
    type: 'object',
    properties: {
        initialAmount: { type: 'number', multipleOf: 0.01 },
        monthlyDeposit: { type: 'number', multipleOf: 0.01 },
        interestRate: { type: 'number', multipleOf: 0.01 },
        interestRateType: { type: 'string', enum: interestRateTypes },
        applyInterestRateOnDeposit: { type: 'boolean' },
    },
    required: [
        'initialAmount',
        'monthlyDeposit',
        'interestRate',
        'interestRateType',
        'applyInterestRateOnDeposit',
    ],
    additionalProperties: false,
};

calculateRouter.get(`/${pathName}`, (req: Request, res: Response) => {
    const validate = ajv.compile(schema);
    if (validate(req.query)) {
        console.log(`Called ${pathName} with query:`, req.query);
        res.status(200).send(getCompoundInterestRates(req.query));
        return;
    } else {
        console.log(
            `Called ${pathName} with invalid query:`,
            req.query,
            `. Error:`,
            validate.errors
        );
        const errorMessage = validate.errors?.map((e) => e.message).join('. ');
        res.status(400).send({ error: errorMessage });
        return;
    }
});

export default calculateRouter;
