'use client';
import { Box, Grid, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import StockInfoTable from '../components/dashboard/StockInfoTable';


const SamplePage = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
            <StockInfoTable />
      </Box>
    </PageContainer>
  );
};

export default SamplePage;

