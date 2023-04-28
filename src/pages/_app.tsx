import { Layout } from "@/components/layout";
import "@/styles/globals.css";
import "@/styles/imports.tailwind.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
