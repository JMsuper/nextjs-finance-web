'use client';

import { Box } from '@mui/material';
import PageContainer from '@/containers/PageContainer';

const Dashboard: React.FC = () => (
  <PageContainer title="Dashboard" description="this is Dashboard">
    <Box>이 웹페이지는 주식 정보를 제공합니다.</Box>
  </PageContainer>
);

export default Dashboard;
