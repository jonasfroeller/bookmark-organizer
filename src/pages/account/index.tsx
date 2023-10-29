import { getSession } from "next-auth/react";
import type { User } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";

const Account = (u: { user: User }) => {
  const username = u.user.name;

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <h1>Welcome, {username}!</h1>
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  | { props: { user: User } }
  | { redirect: { destination: string; permanent: boolean } }
> {
  const session = await getSession(context);

  // if not logged in, redirect to sign-in
  if (!session || "redirect" in session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false, // don't cache redirect
      },
    };
  } else {
    return {
      props: {
        user: session.user,
      },
    };
  }
}

export default Account;
