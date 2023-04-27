import { Layout } from "@/components/layout";
import "@/styles/globals.css";
import "@/styles/imports.tailwind.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
