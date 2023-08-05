import "~/styles/globals.scss";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Navigation } from "~/components/Navigation";
import { Notification } from "~/components/Notification";
import { Footer } from "~/components/Footer";
import { Main } from "~/components/Main";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Navigation />
      <Main>
        <Component {...pageProps} />
        <Notification />
      </Main>
      <Footer />
    </SessionProvider>
  );
};

export default api.withTRPC(App);