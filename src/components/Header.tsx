import Link from "next/link";
import { Button } from "@radix-ui/themes";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-green-12 text-white">
      <h1 className="text-2xl font-bold"><Link href="/">Bookmark Organizer</Link></h1>
      <Link href="/login">
        <Button className="rounded-full px-4 py-2 font-semibold transition cursor-pointer">
          Sign In
        </Button>
      </Link>
    </header>
  );
}
