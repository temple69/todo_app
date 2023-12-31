
import Layout from "@/Components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    //General Layout
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
