import React from 'react';
import { Container } from '@chakra-ui/react';
import { Form, FormValues } from './CalculatorForm';
import CalculatorApi from '../../../commons/api/CalculatorApi';
import { CalculatorChart, ChartValues } from './CalculatorChart';
import { Loading } from '../../loading/Loading';
import { ErrorLabel } from '../../error/ErrorLabel';

export const Homepage: React.FC = () => {
    const [formValues, setFormValues] = React.useState<FormValues>({
        initialAmount: 100,
        monthlyDeposit: 50,
        interestRate: 0.01,
        interestRateType: 'monthly',
        applyInterestRateOnDeposit: true,
    });
    const [chartValues, setChartValues] = React.useState<ChartValues>([]);
    const [chartState, setChartState] = React.useState({ loading: false, error: '' });

    const onChangeFormValues = (newValues: FormValues) => {
        setFormValues({ ...newValues });
    };

    React.useEffect(() => {
        let isMounted = true;

        async function calculate() {
            setChartState({ loading: true, error: '' });
            const response = await CalculatorApi.getCompoundInterest({
                initialAmount: formValues.initialAmount,
                monthlyDeposit: formValues.monthlyDeposit,
                interestRate: formValues.interestRate,
                interestRateType: formValues.interestRateType,
                applyInterestRateOnDeposit: formValues.applyInterestRateOnDeposit,
            });
            if (isMounted) {
                if (response.error) {
                    setChartState({ loading: false, error: response.error.message });
                } else {
                    setChartValues(response.data ?? []);
                    setChartState({ loading: false, error: '' });
                }
            }
        }
        calculate();

        return () => {
            // if component is being re-rendered/removed: ignore the API result
            isMounted = false;
        };
    }, [formValues]);

    return (
        <>
            <Container position="relative" pt={10}>
                <Loading loading={chartState.loading} />
                {!chartState.loading && chartState.error && (
                    <ErrorLabel message={chartState.error} />
                )}
                <CalculatorChart chartValues={chartValues} />
            </Container>
            <Container>
                <Form value={formValues} onChangeValues={onChangeFormValues} />
            </Container>
        </>
    );
};
