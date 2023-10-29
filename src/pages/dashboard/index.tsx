import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import type { GetServerSidePropsContext } from "next";
import type { User } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";

const Dashboard = (u: { user: User }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const username = u.user.name;

  useEffect(() => {
    const controls = animate(count, 100);

    return () => controls.stop();
  }, [count]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Welcome, {username}!</h1>
      <motion.div>{rounded}</motion.div>
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

export default Dashboard;
