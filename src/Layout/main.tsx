import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { Footer, Navbar, OwnerCta } from "src/componets";

interface Props {
  children: ReactNode;
  onlyNav?: boolean;
}
const Layout = ({ children, onlyNav }: Props) => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <div className="overflow-hidden bg-[#F5F5F5]">
      <Navbar />
      <main className="overflow-x-hidden">{children}</main>
      <>
        {!onlyNav ? (
          <>
            <OwnerCta />
            <Footer />
          </>
        ) : null}
      </>
    </div>
  );
};

export default Layout;
