import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppContextProvider } from "src/Context/AppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import "../styles/addProperty.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/globals.css';



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// type guardPrps = {
//   children: React.ReactNode;
//   adminGuard: boolean;
//   userGuard: boolean;

// }


// const Guard = ({ children, adminGuard, userGuard }: guardPrps) => {
//   if (userGuard) {
//     return <GuestGuard fallback={<CustomLoader />}>{children}</GuestGuard>
//   } else if (adminGuard) {
//     return <adminGuard fallback={<CustomLoader />}>{children}</adminGuard>
//   } else (!guestGuard && !authGuard) {
//     return <>{children}</>
//   }


  export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
      <>
        <AppContextProvider>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
        </AppContextProvider>
      </>
    );
  }
