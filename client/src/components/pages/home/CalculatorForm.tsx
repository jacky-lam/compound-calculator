import React from 'react';
import { Box, FormLabel, HStack, NumberInput, NumberInputField, Select } from '@chakra-ui/react';

export type FormValues = {
    initialAmount: number;
    monthlyDeposit: number;
    interestRate: number;
    interestRateType: 'monthly';
    applyInterestRateOnDeposit: boolean;
};

const formatPercentage = (value: number): number => value * 100;
const parsePercentage = (value: number): number => value / 100;

export const Form: React.FC<{
    value: FormValues;
    onChangeValues: (newValue: FormValues) => void;
}> = ({ value, onChangeValues }) => {
    return (
        <Box>
            <FormLabel>Initial Amount:</FormLabel>
            <NumberInput
                onChange={(_: string, inputValue: number) => {
                    onChangeValues({ ...value, initialAmount: inputValue });
                }}
                value={value.initialAmount}
                min={0}
                max={1_000_000_000_000}
                precision={2}
            >
                <NumberInputField />
            </NumberInput>
            <FormLabel paddingTop={5}>Monthly Deposit:</FormLabel>
            <NumberInput
                onChange={(_: string, inputValue: number) => {
                    onChangeValues({ ...value, monthlyDeposit: inputValue });
                }}
                value={value.monthlyDeposit}
                min={0}
                max={1_000_000_000}
                precision={2}
            >
                <NumberInputField />
            </NumberInput>
            <FormLabel paddingTop={5}>Interest Rate (%):</FormLabel>
            <HStack>
                <NumberInput
                    flex={1}
                    onChange={(_: string, inputValue: number) => {
                        onChangeValues({ ...value, interestRate: parsePercentage(inputValue) });
                    }}
                    value={formatPercentage(value.interestRate)}
                    min={0}
                    max={100}
                    precision={2}
                >
                    <NumberInputField />
                </NumberInput>
                <Select
                    width="auto"
                    textAlign="right"
                    value={value.interestRateType}
                    onChange={() => {
                        console.log('changed interest rate type!');
                    }}
                >
                    <option value="monthly">Monthly</option>
                </Select>
            </HStack>
        </Box>
    );
};
