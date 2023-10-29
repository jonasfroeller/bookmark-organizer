import Head from "next/head";
import "~/styles/globals.scss";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Navigation } from "~/components/Navigation";
import { Footer } from "~/components/Footer";
import { Main } from "~/components/Main";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Bookmark Organizer</title>
        <meta name="description" content="Are Your Bookmarks Out Of Control?" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navigation />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </SessionProvider>
  );
};

export default api.withTRPC(App);
