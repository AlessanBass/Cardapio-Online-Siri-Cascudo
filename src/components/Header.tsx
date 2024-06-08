import styleHeader from '@/styles/header.module.css';
import Link from 'next/link';
import { Button } from 'primereact/button';
import hamburguesData from '@/products/hamburgues.json';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';

interface Pedido {
    id_produto: number;
    type: number;
    quantidade: number;
}

interface Hamburgues {
    id: number;
    name: string;
    type: number;
    description: string;
    ingredients: string;
    price: number;
}

interface HeaderProps {
    selectedProducts: Pedido[];
    totalPrice: number;
    setSelectedProducts: (products: Pedido[]) => void; // Adicione esta linha
    setTotalPrice: (price: number) => void;
}

export default function Header({ selectedProducts, totalPrice, setSelectedProducts,setTotalPrice }: HeaderProps) {

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const dialogElement = document.querySelector('.p-dialog');
            if (dialogElement && event.target instanceof Node && !dialogElement.contains(event.target)) {
                closeDialog();
            }
        }

        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [visible, setVisible] = useState(false);
    const hamburgues: Hamburgues[] = hamburguesData;

    const openDialog = () => {
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
    };

    const handleShowCart = () => {
        openDialog();
    };

    const handleRemoveProduct = (id_pedido: number, price: number, qtd: number) => {
        /* console.log(id_pedido); */
        const newSelectedProducts = [...selectedProducts];
        newSelectedProducts.splice(id_pedido, 1);
        setSelectedProducts(newSelectedProducts); 
        setTotalPrice(totalPrice -= (price * qtd));
    };

    const handleFinalizeOrder = () => {
       
    };

    return (
        <header className={`${styleHeader.header}`}>
            <Link href="">
                LOGO
            </Link>

            <button onClick={handleShowCart}>Exibir Carrinho</button>

            <Dialog visible={visible} style={{ width: '50vw', borderRadius: '20px', backgroundColor:'white', color:'black'}} onHide={closeDialog} modal>
                <div>
                    <h2>Seus Pedidos</h2>
                    {selectedProducts.map((product, index) => {
                        const burger = hamburgues.find(burger => burger.id === product.id_produto);
                        return (
                            <div key={index}>
                                <p>Nome: {burger ? burger.name : 'Hambúrguer não encontrado'} Quantidade: {product.quantidade} Preço: {burger ? burger.price : '-'}</p>
                                <button onClick={() => handleRemoveProduct(index, burger ? burger.price:0, product.quantidade)}>Remover</button>
                            </div>
                        );
                    })}
                    <h3>Preço Total: {totalPrice.toFixed(2)}</h3>
                    <button onClick={handleFinalizeOrder}>Finalizar Pedido</button>
                </div>
            </Dialog>
        </header>
    );
}
