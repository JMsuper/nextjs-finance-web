

import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepZero from './StepZero';
import DashboardCard from '../shared/DashboardCard';
import useFetch from '@/app/hooks/useFetch';
import { StockFinanceInfo } from './StockFinanceInfo';
import { Rowdies } from 'next/font/google';

// const StepZeroPart = () => {
//     // Implement the Present Value Verification Tool here
//     return (<div><h3>스크리닝 대상 종목 선정</h3><br></br>
//         <StepZero></StepZero>
//     </div>);
// }

// const StepOnePart = () => {
//     // Implement the Present Value Verification Tool here
//     return (<div>- 현재의 주당순자산가치를 확인한다.<br></br>
//         - 주당순자산가치 = 자본총계 / 총방행주식수
//         <StepOne></StepOne>
//     </div>);
// };

const StepTwoPart = () => {
    // Implement the Future Return Forecasting Tool here
    return <div>- 미래가치를 측정하기 위한 ROE수익률을 예측한다<br></br>
        - ROE = 금년 순이익 / 전년도 순자산<br></br>
        - 최근 3개년 ROE 평균을 향후 10년간의 예상 ROE 수치의 기준으로 사용한다
        <StepTwo roeData={[]}></StepTwo>
    </div>;
};

const StepThreePart = () => {
    // Implement the Future Value Estimation Tool here
    return <div>- 현재 주당순자산가치에서 예상 ROE를 적용해 미래 주당순자산가치를 산정한다.<br></br>
        - 10년 후 주당순자산가치 = 현재 주당순자산가치 * (1 + 예상 ROE)^10
        <StepThree></StepThree>
    </div>;
};

const StepFourPart = () => {
    // Implement the tool for calculating expected returns here
    return <div>- 현재의 주가를 대입해 기대수익률을 산정한다.<br></br>
        - 기대수익률 = (10√(‘10년 후 주당순자산가치’ / ‘현재의 주가’)) - 1<br></br>
        - 산정된 기대수익률이 연 목표수익률을 초과하면 매수한다
        <StepFour></StepFour>
    </div>;
};

const steps = ['0단계 : 대상종목 선정','1단계 : 현재가치 확인', '2단계 : 미래수익률 예측', '3단계 : 미래가치 산정', '4단계 : 기대수익률 산정'];

const ScreeningLayout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set<number>());
    const rows: StockFinanceInfo[] = useFetch('/screening/step1');
    const selectedRows: StockFinanceInfo[] = [];

    // step 0
    const [selected, setSelected] = useState<string[]>([]);

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
                rows.filter((row) => selected.includes(row.stockName)).map((row) => selectedRows.push(row));
                return <StepOne rows={selectedRows}/>;
            case 2:
                return <StepTwoPart />;
            case 3:
                return <StepThreePart />;
            case 4:
                return <StepFourPart />;
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