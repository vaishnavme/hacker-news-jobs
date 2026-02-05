import "@/styles/globals.css";
import type { AppProps } from "next/app";
import fonts from "@/styles/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fonts.geistSans.className} font-sans max-w-2xl mx-auto`}>
      <Component {...pageProps} />
    </div>
  );
}
