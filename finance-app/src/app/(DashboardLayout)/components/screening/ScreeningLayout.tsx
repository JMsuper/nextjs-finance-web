

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
import { Rowdies } from 'next/font/google';

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

// TODO: selectedRows 배열이 직접 수정되고 있습니다.
// 배열을 직접 수정하는 것은 React의 불변성 원칙에 어긋나며, 이로 인해 예상치 못한 버그가 발생할 수 있습니다.
// 대신, 상태를 업데이트할 때는 새로운 배열을 생성하여 사용하는 것이 좋습니다.

// TODO: getStepContent 함수 내에서 사이드 이펙트가 발생합니다.
// 컴포넌트의 렌더링 로직 내에서 사이드 이펙트(예: 상태 업데이트)를 발생시키는 것은 좋지 않습니다. 
// 대신, useEffect 훅을 사용하여 의존성 배열에 selected를 넣어 선택된 항목이 변경될 때만 필터링 로직이 실행되도록 하는 것이 바람직합니다.

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