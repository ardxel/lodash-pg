import Header from '@/widgets/header';
import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren;

export default function PlaygroundLayout({ children }: LayoutProps) {
  return (
    <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <Header />
      {children}
    </div>
  );
}
