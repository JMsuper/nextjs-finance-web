'use client';

import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '@/app/hooks/useFetch';
import DashboardCard from '../shared/DashboardCard';
import { StockFinanceInfo } from './StockFinanceInfo';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import StepSix from './StepSix';

const steps = [
  '1단계 : 대상종목 선정',
  '2단계 : 현재가치 확인',
  '3단계 : 미래수익률 예측',
  '4단계 : 미래가치 산정',
  '5단계 : 기대수익률 산정',
  '6단계 : 종목 선정',
];

const ScreeningLayout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set<number>());
  const rows: StockFinanceInfo[] = useFetch('/screening/step1');
  const [selectedRows, setSelectedRows] = useState<StockFinanceInfo[]>([]);

  // step 0
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const newSelectedRows: StockFinanceInfo[] = [];

    rows
      .filter((row) => selected.includes(row.stockName))
      .map((row) => newSelectedRows.push(row));
    setSelectedRows(newSelectedRows);
  }, [selected, rows]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return;
    }

    if (selected.length === 0 && activeStep === 0) {
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
        return (
          <StepOne rows={rows} selected={selected} setSelected={setSelected} />
        );
      case 1:
        return <StepTwo rows={selectedRows} />;
      case 2:
        return <StepThree rows={selectedRows} />;
      case 3:
        return <StepFour rows={selectedRows} />;
      case 4:
        return <StepFive rows={selectedRows} />;
      case 5:
        return <StepSix rows={selectedRows} />;
      default:
        return <div />;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} sx={{ pb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed.has(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <DashboardCard>{getStepContent(activeStep)}</DashboardCard>

      <div>
        {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? '완료' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default ScreeningLayout;
