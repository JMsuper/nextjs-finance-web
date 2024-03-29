

import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepZero from './StepZero';
import DashboardCard from '../shared/DashboardCard';
import useFetch from '@/app/hooks/useFetch';
import { StockFinanceInfo } from './StockFinanceInfo';

// const StepThreePart = () => {
//     // Implement the Future Value Estimation Tool here
//     return <div>- 현재 주당순자산가치에서 예상 ROE를 적용해 미래 주당순자산가치를 산정한다.<br></br>
//         - 10년 후 주당순자산가치 = 현재 주당순자산가치 * (1 + 예상 ROE)^10
//         <StepThree></StepThree>
//     </div>;
// };

// const StepFourPart = () => {
//     // Implement the tool for calculating expected returns here
//     return <div>- 현재의 주가를 대입해 기대수익률을 산정한다.<br></br>
//         - 기대수익률 = (10√(‘10년 후 주당순자산가치’ / ‘현재의 주가’)) - 1<br></br>
//         - 산정된 기대수익률이 연 목표수익률을 초과하면 매수한다
//         <StepFour></StepFour>
//     </div>;
// };

const steps = ['0단계 : 대상종목 선정','1단계 : 현재가치 확인', '2단계 : 미래수익률 예측', '3단계 : 미래가치 산정', '4단계 : 기대수익률 산정'];

const ScreeningLayout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set<number>());
    const rows: StockFinanceInfo[] = useFetch('/screening/step1');
    const [selectedRows, setSelectedRows] = useState<StockFinanceInfo[]>([]);

    // step 0
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
            const newSelectedRows:StockFinanceInfo[] = [];
            rows.filter((row) => selected.includes(row.stockName)).map((row) => newSelectedRows.push(row));
            setSelectedRows(newSelectedRows);
    }, [selected, rows]);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            return;
        }

        if(selected.length === 0 && activeStep === 0 ){
            alert('종목을 선택해주세요.');
            return;
        }

        // Add the current step to the completed steps
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);

        // Move to the next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        const newCompleted = new Set(completed);
        newCompleted.delete(activeStep);
        newCompleted.delete(activeStep - 1);
        setCompleted(newCompleted);

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <StepZero rows={rows} selected={selected} setSelected={setSelected} />
            case 1:
                return <StepOne rows={selectedRows}/>;
            case 2:
                return <StepTwo rows={selectedRows}/>;
            case 3:
                return <StepThree rows={selectedRows} />;
            case 4:
                return <StepFour rows={selectedRows} />;
            default:
                return (<div></div>)
        }
    };

    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed.has(index)}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <DashboardCard>
                {getStepContent(activeStep)}
            </DashboardCard>

            <div>
                {activeStep !== 0 && (
                    <Button onClick={handleBack}>
                        Back
                    </Button>
                )}
                <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? '완료' : 'Next'}
                </Button>
            </div>
        </div>
    );
};

export default ScreeningLayout;