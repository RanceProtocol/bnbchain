import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const AppProviders = dynamic(() => import("../AppProviders"), {
    ssr: false,
});

const Layout = dynamic(() => import("../Components/Layout"), {
    ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProviders>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppProviders>
    );
}

export default MyApp;
