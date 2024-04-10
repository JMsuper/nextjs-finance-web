'use client';

import { Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import StockInfoTable from './components/dashboard/StockInfoTable';
import useFetch from '../hooks/useFetch';

const Dashboard: React.FC = () => {
  const rows = useFetch('/stockInfos');

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <StockInfoTable rows={rows} />
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
