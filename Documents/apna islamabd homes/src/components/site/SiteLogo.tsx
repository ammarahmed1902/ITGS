type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className = "h-16 sm:h-20 w-auto object-contain" }: SiteLogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Apna Islamabad Homes — Trust | Invest | Grow"
      className={className}
    />
  );
}
