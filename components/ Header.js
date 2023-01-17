import { Outfit } from '@next/font/google';
import Link from 'next/link';

const headingFont = Outfit({ weight: '700', subsets: ['latin'] });

const Header = () => (
  <header className="title-header">
    <h1 className={headingFont.className}>Matt Coffyn</h1>
    <div className="header-info">
      <a href="mailto:matt@mattcoffyn.com">matt@mattcoffyn.com</a>
    </div>
  </header>
);

export default Header;
