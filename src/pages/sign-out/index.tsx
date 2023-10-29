import { getSession } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import Head from "next/head";

const SignOut = function (redirect: boolean) {
  useEffect(() => {
    if (redirect) {
      signOut()
        .then(() => {
          console.log("signed out");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [redirect]);

  return (
    <>
      <Head>
        <title>Sign Out</title>
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center justify-center">
        <h1 className="pb-6 text-6xl text-primary-950">Signing you out...</h1>
      </div>
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  | { props: { redirect: boolean } }
  | { redirect: { destination: string; permanent: boolean } }
> {
  const session = await getSession(context);

  if (session) {
    return {
      props: { redirect: true },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false, // don't cache redirect
      },
    };
  }
}

export default SignOut;
