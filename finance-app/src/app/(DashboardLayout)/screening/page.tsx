'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import ScreeningLayout from '../components/screening/ScreeningLayout';


const ScreeningPage = () => {
  return (
    <PageContainer title="눈덩이 주식 투자법 4단계" description="눈덩이 주식 투자법 4단계">
        
      <ScreeningLayout></ScreeningLayout>

    </PageContainer>
  );
};

export default ScreeningPage;

