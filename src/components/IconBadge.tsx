import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  dark?: boolean;
  small?: boolean;
  className?: string;
};

export default function IconBadge({ children, dark = false, small = false, className = '' }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`icon-badge ${dark ? 'icon-badge-dark' : ''} ${small ? 'icon-badge-small' : ''} ${className}`}
    >
      {children}
    </span>
  );
}
