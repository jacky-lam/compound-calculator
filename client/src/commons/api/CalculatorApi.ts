import axios from 'axios';

type AppError = {
    message: string;
};

type CalculateParam = {
    initialAmount: number;
    monthlyDeposit: number;
    interestRate: number;
    interestRateType: 'monthly';
    applyInterestRateOnDeposit: boolean;
};
type CalculateResponse = {
    result: Array<{
        year: number;
        portfolioValue: number;
    }>;
    error: AppError;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

class CalculatorApi {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'localhost:3001';
    }

    getCalculate = async (
        param: CalculateParam
    ): Promise<{ data?: CalculateResponse['result']; error?: CalculateResponse['error'] }> => {
        console.log('calling getCalculate...', param);
        await delay(2000);
        try {
            const response = await axios.get<CalculateResponse>(this.baseUrl + '/calculate', {
                params: param,
            });
            if (response.data.error) {
                console.error(`status: ${response.status}. response:`, response.data);
                return { error: response.data.error };
            } else {
                return { data: response.data.result };
            }
        } catch (err) {
            console.error('Failed getCalculate!', err);
            return {
                error: {
                    message:
                        'Opps, there was a problem reaching the server. Please try again later',
                },
            };
        }
    };
}

export default new CalculatorApi();
