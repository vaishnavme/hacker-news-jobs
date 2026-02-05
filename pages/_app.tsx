import "@/styles/globals.css";
import type { AppProps } from "next/app";
import fonts from "@/styles/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`${fonts.geistSans.className} font-sans max-w-2xl mx-auto`}
      >
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
