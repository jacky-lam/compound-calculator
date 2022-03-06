import React from 'react';
import { Container } from '@chakra-ui/react';
import LineChart from '../../chart/LineChart';

export type ChartValues = Array<{ year: number; portfolioValue: number }>;

export const CalculatorChart: React.FC<{
    chartValues: ChartValues;
}> = ({ chartValues }) => {
    const xAxis = [];
    const yAxis = [];
    chartValues.forEach((cv) => {
        xAxis.push(cv.year);
        yAxis.push(cv.portfolioValue);
    });

    const xAxis2 = [0, 1, 2, 3, 4, 5];
    const yAxix2 = [100, 150, 180, 210, 240, 350];

    return (
        <Container height={250}>
            <LineChart
                title="Savings Over time"
                xAxisData={xAxis2}
                yAxisData={yAxix2}
                xLabel="Years"
                yLabel="Amount"
            />
        </Container>
    );
};
