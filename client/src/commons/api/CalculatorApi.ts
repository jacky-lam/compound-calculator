import axios from 'axios';
import { InterestRateType } from '../constant/InterestRateType';
import BaseApi, { ApiError } from './BaseApi';

type CalculateParam = {
    initialAmount: number;
    monthlyDeposit: number;
    interestRate: number;
    interestRateType: InterestRateType;
    applyInterestRateOnDeposit: boolean;
};
type CalculateResponse = Array<{
    year: number;
    value: number;
}>;

class CalculatorApi extends BaseApi {
    baseUrl: string;

    constructor() {
        super();
        this.baseUrl = this.baseApiUrl + '/calculate';
    }

    getCompoundInterest = async (
        param: CalculateParam
    ): Promise<{ data?: CalculateResponse; error?: ApiError }> => {
        console.log('Calling getCalculate...', param);
        try {
            const response = await axios.get<CalculateResponse>(
                this.baseUrl + '/compound-interest',
                {
                    params: param,
                }
            );
            return { data: response.data };
        } catch (err) {
            console.error('Failed getCalculate!', err);
            return {
                error: {
                    message: 'Opps, there was a problem. Please try again later',
                },
            };
        }
    };
}

export default new CalculatorApi();
