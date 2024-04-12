'use client';

import { Typography } from '@mui/material';
import PageContainer from '@/containers/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const SamplePage = () => (
  <PageContainer title="Sample Page" description="this is Sample page">
    <DashboardCard title="Sample Page">
      <Typography>This is a sample page</Typography>
    </DashboardCard>
  </PageContainer>
);

export default SamplePage;
