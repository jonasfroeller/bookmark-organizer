import Link from "next/link";
import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import UserProfile from "@/components/user-profile";
import { getSession } from "@/server/auth";
import { Button } from "@radix-ui/themes";
import BookmarkManager from '@/components/BookmarkManager';

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession();

  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col items-center justify-center">
        {!session?.user ? (
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-center mt-28">
            Are Your Bookmarks<br></br>Out Of Control?
          </h1>

          <Link href="/login" className="cursor-pointer">
            <Button size="4" variant="solid" color="amber">
              Yes!
            </Button>
          </Link>

          <h2 className="text-5xl font-bold">Features</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            <div className="flex flex-col gap-4 rounded-xl p-4">
              <h3 className="text-2xl font-bold">Viewing</h3>
              <p>Read, reorder, sort, and search your bookmarks.</p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
              <h3 className="text-2xl font-bold">Saving</h3>
              <p>Export and import your bookmarks easily.</p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
              <h3 className="text-2xl font-bold">Managing</h3>
              <p>Create, update, and delete bookmarks effortlessly.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold">MVP Demo</h2>
          <BookmarkManager />
        </div>
        ) : (
        <div>
          <UserProfile user={session.user} />
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
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
