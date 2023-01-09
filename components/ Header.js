import { Outfit } from '@next/font/google';

const headingFont = Outfit({ weight: '700', subsets: ['latin'] });

const Header = () => (
  <section className="title-header">
    <h1 className={headingFont.className}>Matt Coffyn</h1>
  </section>
);

export default Header;
