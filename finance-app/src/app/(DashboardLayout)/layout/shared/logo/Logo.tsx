import Link from 'next/link';
import { styled } from '@mui/material';
import Image from 'next/image';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/logo.PNG"
        alt="logo"
        height={45}
        width={174}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
