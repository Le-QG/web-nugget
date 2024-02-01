import Image from "next/image";
import { Leaderboard } from "~/components/leaderboard";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#161512] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <Image
            src="/icon.webp"
            alt="NuggetIcon"
            width={80}
            height={80}
            className="inline"
          />{" "}
          <span className="text-[#FFAA00]">Nugget</span>
          <span className="text-[#AA00AA]">Hub</span>
        </h1>
        <Leaderboard />
      </div>
    </main>
  );
}
