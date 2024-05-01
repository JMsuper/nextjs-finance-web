'use client';

import { baselightTheme } from '@/utils/theme/DefaultColors';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <SnackbarProvider
            hideIconVariant={true}
            autoHideDuration={1500}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <ThemeProvider theme={baselightTheme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </SnackbarProvider>
        </RecoilRoot>
      </body>
    </html>
  );
};

export default RootLayout;
