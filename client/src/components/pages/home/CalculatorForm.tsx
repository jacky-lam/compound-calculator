import React from 'react';
import { Box, FormLabel, HStack, NumberInput, NumberInputField, Select } from '@chakra-ui/react';
import {
    InterestRateType,
    interestRateTypes,
    parseInterestRateType,
} from '../../../commons/constant/InterestRateType';

export type FormValues = {
    initialAmount: number;
    monthlyDeposit: number;
    interestRate: number;
    interestRateType: InterestRateType;
    applyInterestRateOnDeposit: boolean;
};

const formatPercentage = (value: number): number => value * 100;
const parsePercentage = (value: number): number => value / 100;
const capitalise = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};

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
                max={1_000_000}
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
                max={1_000_000}
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
                    onChange={(event) => {
                        if (event) {
                            onChangeValues({
                                ...value,
                                interestRateType: parseInterestRateType(event.target.value),
                            });
                        }
                    }}
                >
                    {interestRateTypes.map((interestRateType) => (
                        <option key={interestRateType} value={interestRateType}>
                            {capitalise(interestRateType)}
                        </option>
                    ))}
                </Select>
            </HStack>
            <FormLabel paddingTop={5}>Compound Intervals: Monthly</FormLabel>
        </Box>
    );
};
