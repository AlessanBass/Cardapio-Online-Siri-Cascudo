import styleHeader from '@/styles/header.module.css';
import Link from 'next/link';
import { Button } from 'primereact/button';

interface Pedido {
    id_produto: number;
    type: number;
    quantidade: number;
}

interface HeaderProps {
    selectedProducts: Pedido[];
    totalPrice: number;
}

export default function Header({ selectedProducts, totalPrice }: HeaderProps) {
    const handleShowCart = () => {
        console.log("Produtos selecionados:");
        console.log(selectedProducts);
        console.log("Preço total:", totalPrice);
    };
    return (
        <header className={`${styleHeader.header}`}>
            <Link href="">
                LOGO
            </Link> 

            <button onClick={handleShowCart}>Exibir Carrinho</button>
        </header>
    );
}