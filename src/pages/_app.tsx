import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Header from "../../components/Header";
import { AuthProvider } from "../../context/AuthContext";
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return (
    <>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}
