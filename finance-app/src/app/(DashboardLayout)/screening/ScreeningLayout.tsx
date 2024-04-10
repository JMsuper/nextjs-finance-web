'use client';

import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import DashboardCard from '../components/shared/DashboardCard';
import { StockFinanceInfo } from './StockFinanceInfo';
import StepOne from '../../../containers/screening/stepOne/StepOne';
import StepTwo from '../../../containers/screening/stepTwo/StepTwo';
import StepThree from '../../../containers/screening/stepThree/StepThree';
import StepFour from '../../../containers/screening/stepFour/StepFour';
import StepFive from '../../../containers/screening/stepFive/StepFive';
import StepSix from '../../../containers/screening/stepSix/StepSix';

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

    switch (activeStep) {
      case 0:
        if (selected.length === 0) {
          alert('종목을 선택해주세요.');
          return;
        }
        break;
      case 1:
        if (selectedRows[0].bps === undefined) {
          alert('BPS를 계산해주세요.');
          return;
        }
        break;
      case 2:
        if (selectedRows[0].threeYearROEAvg === undefined) {
          alert('ROE를 계산해주세요.');
          return;
        }
        break;
      case 3:
        if (selectedRows[0].tenYearFutureValue === undefined) {
          alert('10년 후 미래가치를 계산해주세요.');
          return;
        }
        break;
      case 4:
        if (selectedRows[0].expectedReturn === undefined) {
          alert('기대수익률을 계산해주세요.');
          return;
        }
        break;
      case 5:
        return;
      default:
        return;
    }

    if (selected.length === 0 && activeStep === 0) {
      alert('종목을 선택해주세요.');
      return;
    }

    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

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
        {activeStep !== steps.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScreeningLayout;
