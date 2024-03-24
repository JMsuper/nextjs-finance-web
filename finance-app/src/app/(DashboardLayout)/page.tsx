'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import StockInfoTable from './components/dashboard/StockInfoTable';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        {/* <Grid container spacing={3}>
          <Grid item lg={12}> */}
            <StockInfoTable />
          {/* </Grid>
        </Grid> */}
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
