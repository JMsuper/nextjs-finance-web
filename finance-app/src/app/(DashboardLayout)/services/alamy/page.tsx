'use client';

import PageContainer from '@/containers/PageContainer';
import Typography from '@mui/material/Typography';
import DashboardCard from '../../../../components/shared/DashboardCard';
const AlamyPage: React.FC = () => {
  return (
    <PageContainer title="매수/매도 알리미" description="매수/매도 알리미">
      <DashboardCard title="매수/매도 알리미">
        <Typography>개발 진행중 입니다</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AlamyPage;
