'use client';

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { IconHelpCircle } from '@tabler/icons-react';
import InfoDialog from '@/components/shared/InfoDialog';

import ScreeningStepsInformation from '@/utils/ScreeningStepsInformation';
import DashboardCard from '../components/shared/DashboardCard';
import { StockFinanceInfo } from './StockFinanceInfo';
import StepOne from '../../../containers/screening/stepOne/StepOne';
import StepTwo from '../../../containers/screening/stepTwo/StepTwo';
import StepThree from '../../../containers/screening/stepThree/StepThree';
import StepFour from '../../../containers/screening/stepFour/StepFour';
import StepFive from '../../../containers/screening/stepFive/StepFive';
import StepSix from '../../../containers/screening/stepSix/StepSix';

// const steps = [
//   '1단계 : 대상종목 선정',
//   '2단계 : 현재가치 확인',
//   '3단계 : 미래수익률 예측',
//   '4단계 : 미래가치 산정',
//   '5단계 : 기대수익률 산정',
//   '6단계 : 종목 선정',
// ];

// const stepsInformation = [
//   '대상종목 선정은 종목을 선택하는 단계입니다. 종목을 선택하면 다음 단계로 넘어갈 수 있습니다.',
//   '현재가치 확인은 주당순자산 가치를 계산하는 단계입니다. 주당순자산 가치를 계산하면 다음 단계로 넘어갈 수 있습니다.',
//   '미래수익률 예측은 10년 후의 주당순자산 가치를 계산하는 단계입니다. 10년 후의 주당순자산 가치를 계산하면 다음 단계로 넘어갈 수 있습니다.',
//   '미래가치 산정은 기대수익률을 계산하는 단계입니다. 기대수익률을 계산하면 다음 단계로 넘어갈 수 있습니다.',
//   '기대수익률 산정은 종목을 선정하는 단계입니다. 종목을 선정하면 다음 단계로 넘어갈 수 있습니다.',
//   '종목 선정은 종목을 선택하는 단계입니다. 종목을 선택하면 다음 단계로 넘어갈 수 있습니다.',
// ];

const ScreeningLayout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set<number>());
  const rows: StockFinanceInfo[] = useFetch('/screening/step1');
  const [selectedRows, setSelectedRows] = useState<StockFinanceInfo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const steps = ScreeningStepsInformation;

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
      {dialogOpen && (
        <InfoDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title={steps[activeStep].title}
          content={steps[activeStep].description}
        />
      )}
      <Stepper activeStep={activeStep} sx={{ pb: 4 }}>
        {steps.map((info, index) => (
          <Step key={info.title} completed={completed.has(index)}>
            <StepLabel>{info.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <DashboardCard>
        <div>
          <Box display="flex" alignItems="center" marginBottom="10px">
            <Typography variant="h6" color="primary" marginRight="5px">
              {steps[activeStep].title}
            </Typography>
            <IconButton onClick={() => setDialogOpen(true)}>
              <IconHelpCircle />
            </IconButton>
          </Box>

          {getStepContent(activeStep)}
        </div>
      </DashboardCard>

      <Box sx={{ mt: '15px' }}>
        {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep !== steps.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </div>
  );
};

export default ScreeningLayout;
