import styles from "../styles/Home.module.scss";
import { LogInButton } from "~/components/LogInButton";
import { Root } from "@radix-ui/react-toolbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <section className="flex flex-col items-center justify-center bg-gradient-to-b from-[#011C1E] to-[#236162]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Are Your Bookmarks<br></br>
            Out Of Control?
          </h1>
          <div className="flex flex-col items-center gap-2">
            <Root
              className={`${styles.toolbar}`}
              aria-label="Formatting options"
            >
              <LogInButton />
            </Root>
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-[3rem]">
            Features
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            <div
              className={`flex max-w-xs flex-col gap-4 border border-transparent bg-white/10 p-4 text-white hover:border-[#fff] hover:bg-white/20`}
            >
              <h3 className="text-2xl font-bold">Viewing</h3>
              <ul className={`${styles.feature_card__list} text-lg`}>
                <li>Read</li>
                <li>Reorder</li>
                <li>Sort</li>
                <li>Search</li>
              </ul>
            </div>
            <div className="flex max-w-xs flex-col gap-4 border border-transparent bg-white/10 p-4 text-white hover:border-[#fff] hover:bg-white/20">
              <h3 className="text-2xl font-bold">Saving</h3>
              <ul className={`${styles.feature_card__list} text-lg`}>
                <li>Export</li>
                <li>Import</li>
              </ul>
            </div>
            <div className="flex max-w-xs flex-col gap-4 border border-transparent bg-white/10 p-4 text-white hover:border-[#fff] hover:bg-white/20">
              <h3 className="text-2xl font-bold">Managing</h3>
              <ul className={`${styles.feature_card__list} text-lg`}>
                <li>Create</li>
                <li>Update</li>
                <li>Delete</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
