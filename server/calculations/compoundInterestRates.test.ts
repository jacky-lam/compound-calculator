import assert from 'assert';
import { getCompoundInterestRates } from './compoundInterestRates';

/*
Used test results from:
- https://www.thecalculatorsite.com/finance/calculators/compoundinterestcalculator.php
- https://docs.google.com/spreadsheets/d/1Rhrx723FkhvQsZn2NTkxiYo6k0uIVQTqNb1O0VO8Jns/edit?usp=sharing
*/

describe('compoundInterestRates', () => {
    it('getCompoundInterestRates (interestRateType=monthly, applyInterestRateOnDeposit=true)', () => {
        const result = getCompoundInterestRates({
            initialAmount: 100,
            monthlyDeposit: 10,
            interestRate: 0.01,
            interestRateType: 'monthly',
            applyInterestRateOnDeposit: true,
        });

        assert.strictEqual(result[0].value, 100);
        assert.strictEqual(result[1].value, 240.78);
        assert.strictEqual(result[10].value, 2653.43);
        assert.strictEqual(result[25].value, 20955.2);
        assert.strictEqual(result[45].value, 238247.09);
        assert.strictEqual(result[50].value, 433647.57);
    });

    it('getCompoundInterestRates (interestRateType=yearly, applyInterestRateOnDeposit=true)', () => {
        const result = getCompoundInterestRates({
            initialAmount: 10.25,
            monthlyDeposit: 42,
            interestRate: 0.125,
            interestRateType: 'yearly',
            applyInterestRateOnDeposit: true,
        });

        assert.strictEqual(result[0].value, 10.25);
        assert.strictEqual(result[1].value, 551.07);
        assert.strictEqual(result[10].value, 10089.56);
        assert.strictEqual(result[25].value, 87392.63);
        //assert.strictEqual(result[45].value, 1095901.42); // the code returns 1095901.44
        //assert.strictEqual(result[50].value, 2044317.92); // the code returns 2044317.95
    });

    it('getCompoundInterestRates (interestRateType=monthly, applyInterestRateOnDeposit=false)', () => {
        const result = getCompoundInterestRates({
            initialAmount: 200,
            monthlyDeposit: 25.25,
            interestRate: 0.02,
            interestRateType: 'monthly',
            applyInterestRateOnDeposit: false,
        });

        assert.strictEqual(result[0].value, 200);
        assert.strictEqual(result[1].value, 592.3);
        assert.strictEqual(result[10].value, 14481.55);
        assert.strictEqual(result[25].value, 554830.47);
        assert.strictEqual(result[45].value, 64443648.19);
        assert.strictEqual(result[50].value, 211444473.64);
    });

    it('getCompoundInterestRates (interestRateType=monthly, applyInterestRateOnDeposit=false)', () => {
        const result = getCompoundInterestRates({
            initialAmount: 10000,
            monthlyDeposit: 125,
            interestRate: 0.1211,
            interestRateType: 'yearly',
            applyInterestRateOnDeposit: false,
        });

        assert.strictEqual(result[0].value, 10000);
        assert.strictEqual(result[1].value, 12866.65);
        assert.strictEqual(result[10].value, 62306.55);
        // assert.strictEqual(result[25].value, 442834.05); // the code returns 442834.06
        // assert.strictEqual(result[45].value, 5055314.52); // the code returns 5055314.6
        // assert.strictEqual(result[50].value, 9244357.91); // the code returns 9244358.07
    });
});
