'use client';

import { Box } from '@mui/material';
import useFetch from '@/app/hooks/useFetch';
import StockInfoTable from '../components/dashboard/StockInfoTable';

const SamplePage: React.FC = () => {
  const rows = useFetch('/stockInfos');

  return (
    <Box>
      <StockInfoTable rows={rows} />
    </Box>
  );
};

export default SamplePage;
