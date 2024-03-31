import Navbar from "./Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
