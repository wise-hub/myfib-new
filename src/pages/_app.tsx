import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import MainLayout from "../components/MainLayout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  const noLayoutPaths = ["/login", "/auth"];

  const useMainLayout = !noLayoutPaths.includes(pathname);

  return useMainLayout ? (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  ) : (
    <Component {...pageProps} />
  );
}
