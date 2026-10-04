import logoSrc from '../assets/images/ITGS Logo.png';

const Logo = () => (
  <span className="flex size-14 items-center justify-center md:size-16">
    <img src={logoSrc} alt="ITGS" width="64" height="64" className="size-14 object-contain md:size-16" />
  </span>
);

export default Logo;
