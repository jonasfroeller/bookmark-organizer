import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import Head from "next/head";

const SignIn = function (redirect: boolean) {
  useEffect(() => {
    if (redirect) {
      signIn()
        .then(() => {
          console.log("signed in");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [redirect]);

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center justify-center">
        <h1 className="pb-6 text-6xl text-primary-950">
          redirecting to OAuth providers...
        </h1>
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

  if (!session) {
    return {
      props: { redirect: true },
    };
  } else {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false, // don't cache redirect
      },
    };
  }
}

export default SignIn;
