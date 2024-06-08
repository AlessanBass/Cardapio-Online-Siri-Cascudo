import Image from "next/image";
import { Oswald } from "next/font/google";
import Header from "@/components/Header";
import Menu from "@/components/Menu";

const oswald = Oswald({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={oswald.className}>
        <Header/>
        <Menu/>
    </main>
  );
}
