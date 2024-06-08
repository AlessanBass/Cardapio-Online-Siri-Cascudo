import Image from "next/image";
import { Oswald } from "next/font/google";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { useState } from "react";

const oswald = Oswald({ subsets: ["latin"] });

interface Pedido {
  id_produto: number;
  type: number;
  quantidade: number;
}

export default function Home() {
  const [selectedProducts, setSelectedProducts] = useState<Pedido[]>([]);

  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <main className={oswald.className}>
      <Header selectedProducts={selectedProducts} totalPrice={totalPrice} />
      <Menu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} setTotalPrice={setTotalPrice} totalPrice={0}/>
    </main>
  );
}
