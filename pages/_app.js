import { Header } from "@/components/page/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <main>
      <Component {...pageProps} />
    </main>
    |</>
}
