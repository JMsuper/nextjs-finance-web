'use client';

import PageContainer from '@/containers/PageContainer';
import Typography from '@mui/material/Typography';
import DashboardCard from '../../components/shared/DashboardCard';
import UserInfoContainer from '@/containers/mypage/UserInfoContainer';
const ServicesManagementPage: React.FC = () => {
  return (
    <PageContainer title="내 정보" description="내 정보">
      <DashboardCard title="내 정보">
        <UserInfoContainer></UserInfoContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default ServicesManagementPage;
