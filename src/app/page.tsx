import Link from "next/link";
import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import UserProfile from "@/components/user-profile";
import { getSession } from "@/server/auth";
import { Button } from "@radix-ui/themes";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession();

  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-b from-primary-600 to-primary-700">
        {!session?.user ? (
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Are Your Bookmarks Out Of Control?
          </h1>
          <h2 className="text-3xl font-bold text-white">Features</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
              <h3 className="text-2xl font-bold text-white">Viewing</h3>
              <p className="text-white">Read, reorder, sort, and search your bookmarks.</p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
              <h3 className="text-2xl font-bold text-white">Saving</h3>
              <p className="text-white">Export and import your bookmarks easily.</p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
              <h3 className="text-2xl font-bold text-white">Managing</h3>
              <p className="text-white">Create, update, and delete bookmarks effortlessly.</p>
            </div>
          </div>

          <Link href="/login">
            <Button className="rounded-full px-10 py-3 font-semibold transition cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
        ) : (
        <div>
          <UserProfile user={session.user} />
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>
          <LatestPost />
        </div>
        )}
      </div>
    </HydrateClient>
  );
}
