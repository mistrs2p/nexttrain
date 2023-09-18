import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.scss";
import { useEffect } from "react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return <Component {...pageProps} />;
}
