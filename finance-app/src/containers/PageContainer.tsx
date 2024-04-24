'use client';

import { Box } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type Props = {
  description: string;
  children: JSX.Element | JSX.Element[];
  title: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <HelmetProvider>
    <Box>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </Box>
  </HelmetProvider>
);

export default PageContainer;
