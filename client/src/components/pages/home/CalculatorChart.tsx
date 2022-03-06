import React from 'react';
import { Container } from '@chakra-ui/react';
import LineChart from '../../chart/LineChart';

export type ChartValues = Array<{ year: number; value: number }>;

export const CalculatorChart: React.FC<{
    chartValues: ChartValues;
}> = ({ chartValues }) => {
    const xAxis: number[] = [];
    const yAxis: number[] = [];
    chartValues.forEach((cv) => {
        xAxis.push(cv.year);
        yAxis.push(cv.value);
    });

    return (
        <Container height={250}>
            <LineChart
                title="Savings Over time"
                xAxisData={xAxis}
                yAxisData={yAxis}
                xLabel="Years"
                yLabel="Amount"
            />
        </Container>
    );
};
