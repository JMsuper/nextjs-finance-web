'use client';

import PageContainer from '@/containers/PageContainer';
import Typography from '@mui/material/Typography';
import DashboardCard from '../../components/shared/DashboardCard';
const SubscriptionPage: React.FC = () => {
  return (
    <PageContainer title="종목 정보 구독" description="종목 정보 구독">
      <DashboardCard title="종목 정보 구독">
        <Typography>개발 진행중 입니다</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SubscriptionPage;
