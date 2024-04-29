'use client';

import PageContainer from '@/containers/PageContainer';
import Typography from '@mui/material/Typography';
import DashboardCard from '../../../../components/shared/DashboardCard';
const ServicesManagementPage: React.FC = () => {
  return (
    <PageContainer title="알리미/구독 관리" description="알리미/구독 관리">
      <DashboardCard title="알리미/구독 관리">
        <Typography>개발 진행중 입니다</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default ServicesManagementPage;
