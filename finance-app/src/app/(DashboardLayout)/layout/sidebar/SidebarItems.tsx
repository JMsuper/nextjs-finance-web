import React from 'react';
import { usePathname } from 'next/navigation';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useRecoilState } from 'recoil';

import { LoginMenuitems, NoLoginMenuitems } from './MenuItems';
import { AuthState } from '@/app/authentication/auth/AuthState';

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const [authState, setAuthState] = useRecoilState(AuthState);
  let Menuitems = [];
  if (authState.isLogin) {
    Menuitems = LoginMenuitems;
  } else {
    Menuitems = NoLoginMenuitems;
  }

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
