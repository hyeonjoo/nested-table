import "../styles/global.css";
import { StoreProvider } from "@store/StoreProvider";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider {...pageProps}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
