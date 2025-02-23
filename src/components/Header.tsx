import Link from "next/link";
import { Button } from "@radix-ui/themes";
import ThemeSwitcher from '@/components/ThemeSwitcher';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-green-12 text-green-5">
      <h1 className="text-2xl font-bold"><Link href="/">Bookmark Organizer</Link></h1>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Link href="/login">
          <Button className="rounded-full px-4 py-2 font-semibold transition cursor-pointer" color="amber">
            Sign In
          </Button>
        </Link>
      </div>
    </header>
  );
}
