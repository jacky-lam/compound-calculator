export const interestRateTypes = ['monthly', 'yearly'] as const;
export type InterestRateType = typeof interestRateTypes[number];

export const parseInterestRateType = (value: string): InterestRateType => {
    const found = interestRateTypes.find((s) => s === value);
    if (found) {
        return found as InterestRateType;
    }
    throw new Error('Failed parsing InterestRateType: ' + value);
};
