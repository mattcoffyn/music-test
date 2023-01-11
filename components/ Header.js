import { Outfit } from '@next/font/google';

const headingFont = Outfit({ weight: '700', subsets: ['latin'] });

const Header = () => (
  <header className="title-header">
    <h1 className={headingFont.className}>Matt Coffyn</h1>
    <div className="header-info">
      <a href="mailto:matt@mattcoffyn.com">matt@mattcoffyn.com</a>
    </div>
    {/* <nav className={`nav ${headingFont.className}`}>
      <a>Home</a>
      <a>Work</a>
      <a>About</a>
      <a>Contact</a>
    </nav> */}
  </header>
);

export default Header;
