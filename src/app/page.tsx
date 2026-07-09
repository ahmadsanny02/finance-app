import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="">Welcome to Finance App</h1>
      <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
