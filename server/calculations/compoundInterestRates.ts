import BigDecimal from 'js-big-decimal';

export const interestRateTypes = ['monthly', 'yearly'] as const;
type InterestRateType = typeof interestRateTypes[number];

export type CompoundInterestRatesInput = {
    initialAmount: number;
    monthlyDeposit: number;
    interestRate: number;
    interestRateType: InterestRateType;
    applyInterestRateOnDeposit: boolean;
};

// JS sometimes have recurring decimal issues when dividing/multiplying/adding
const roundDecimalPlace = (value: number, dp: number): number => {
    const p = Math.pow(10, dp);
    return Math.round(value * p) / p;
};

type YearValue = { year: number; value: number };

export const getCompoundInterestRates = ({
    initialAmount,
    monthlyDeposit,
    interestRate,
    interestRateType,
    applyInterestRateOnDeposit,
}: CompoundInterestRatesInput): YearValue[] => {
    const years = 50; //currently not configurable
    const numMonths = roundDecimalPlace(years * 12, 0);

    const monthlyInterestRate = new BigDecimal(
        1 +
            (interestRateType === 'monthly'
                ? interestRate
                : roundDecimalPlace(interestRate / 12, 10))
    );
    const monthlyIncrement = new BigDecimal(monthlyDeposit);

    let currentValue = new BigDecimal(initialAmount);

    const result: YearValue[] = [
        { year: 0, value: roundDecimalPlace(Number(currentValue.getValue()), 2) },
    ];

    for (let i = 1; i <= numMonths; i++) {
        if (applyInterestRateOnDeposit) {
            currentValue = currentValue.add(monthlyIncrement);
            currentValue = currentValue.multiply(monthlyInterestRate);
        } else {
            currentValue = currentValue.multiply(monthlyInterestRate);
            currentValue = currentValue.add(monthlyIncrement);
        }
        if (i % 12 === 0) {
            result.push({
                year: i / 12,
                value: roundDecimalPlace(Number(currentValue.getValue()), 2),
            });
        }
    }
    return result;
};
