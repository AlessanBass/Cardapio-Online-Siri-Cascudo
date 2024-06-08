import styleHeader from '@/styles/header.module.css';
import styleCar from '@/styles/carrinho.module.css';
import Link from 'next/link';
import { Button } from 'primereact/button';
import logo from '../../public/logo.png';
import Image from 'next/image';
import hamburguesData from '@/products/hamburgues.json';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

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
    setSelectedProducts: (products: Pedido[]) => void;
    setTotalPrice: (price: number) => void;
}

export default function Header({ selectedProducts, totalPrice, setSelectedProducts, setTotalPrice }: HeaderProps) {

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

    const isNameValid = (name: string) => {
        return name.trim().length >= 2;
    };

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
        const newSelectedProducts = [...selectedProducts];
        newSelectedProducts.splice(id_pedido, 1);
        setSelectedProducts(newSelectedProducts);
        setTotalPrice(totalPrice - (price * qtd));
    };

    const handleFinalizeOrder = () => {
        const nome = name;
        const numeroWhatsApp = '5573981780689'; // Número sem o "+"
        let mensagem = '       *>>> PEDIDO <<<* \n\n';
        mensagem += `*>>> CLIENTE:* ${nome.toUpperCase()}\n\n`;
        mensagem += '*>>> ITENS DO PEDIDO:* \n';

        selectedProducts.forEach((product) => {
            const burger = hamburgues.find(burger => burger.id === product.id_produto);
            if (burger) {
                mensagem += `- ${product.quantidade}x ${burger.name} (R$${burger.price.toFixed(2)})\n`;
            }
        });

        mensagem += `\n*>>> VALOR TOTAL: R$${totalPrice.toFixed(2)}* `;

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    };

    const [name, setName] = useState('');

    return (
        <header className={`${styleHeader.header}`}>
            <Link href="">
                <Image src={logo.src} alt='Logo Siri Cascudo' width={110} height={110} />
            </Link>

            <div>
                <Button onClick={handleShowCart} className={`${styleHeader.button}`}>
                    <i onClick={handleShowCart} className={` fa-solid fa-cart-shopping ${styleHeader.iconButton}`}></i>
                    <span>Ver Carrinho</span>
                </Button>
            </div>

            <Dialog className={`${styleCar.dialog}`} visible={visible} onHide={closeDialog} modal>
                <div className={`${styleCar.divDialog}`}>
                    <Image src={logo.src} alt='Logo Siri Cascudo' width={150} height={150} />
                    <h2 className={`${styleCar.h2}`} >Seu pedido</h2>
                    {selectedProducts.length > 0 ? (
                        <>
                            {selectedProducts.map((product, index) => {
                                const burger = hamburgues.find(burger => burger.id === product.id_produto);
                                return (
                                    <div className={`${styleCar.divPedidos}`} key={index}>
                                        <div>
                                            <p>{product.quantidade}x {burger ? burger.name : 'Hambúrguer não encontrado'}</p>
                                            <p>Preço unidade: {burger ? burger.price : '-'}</p>
                                        </div>

                                        <div>
                                            <i onClick={() => handleRemoveProduct(index, burger ? burger.price : 0, product.quantidade)} className={`fa-solid fa-trash ${styleCar.iconTrash} `}></i>
                                        </div>
                                    </div>
                                );
                            })}
                            <h3 className={styleCar.h3} >Preço Total: <span className={styleCar.spanPrice} >R$ {totalPrice.toFixed(2)} </span></h3>
                            <div className={styleCar.form}>
                                <div className={styleCar.divFormInput}>
                                    <label className={styleCar.label} htmlFor="name">Nome do Cliente:</label>
                                    <InputText className={styleCar.input} id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Informe o seu nome'/>
                                </div>
                            </div>
                            <button className={styleCar.buttonFinishComand} disabled={!isNameValid(name)} onClick={handleFinalizeOrder}>Finalizar Pedido</button>
                        </>
                    ) : (
                        <p className={styleCar.emptyCartMessage}>Ainda não há nada no carrinho.</p>
                    )}
                </div>
            </Dialog>
        </header>
    );
}
