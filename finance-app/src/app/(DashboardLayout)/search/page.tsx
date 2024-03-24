'use client';
import { Box, Grid, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import StockInfoTable from '../components/dashboard/StockInfoTable';


const SamplePage = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <StockInfoTable />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default SamplePage;

