import styleMenu from '@/styles/menu.module.css';
import styleAccordion from '@/styles/acorddion.module.css';
import React, { useState } from 'react';
import iconHamburguer from '../../public/icon_hamburguer.png';
import Image from 'next/image';
import hamburguesData from '@/products/hamburgues.json';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

/* Criar um JSon de prosutos e cada produto terá um tipo(suco, hamhuber e etc) */

interface Hamburgues {
    id: number
    name: string;
    type: number;
    description: string;
    ingredients: string;
    price: number;
}

interface Pedido {
    id_produto: number;
    type: number;
    quantidade: number;
}

interface MenuProps {
    selectedProducts: Pedido[];
    setSelectedProducts: (selectedProducts: Pedido[]) => void;
    totalPrice: number;
    setTotalPrice: (totalPrice: number) => void;
}


export default function Menu({ selectedProducts, setSelectedProducts, totalPrice, setTotalPrice }: MenuProps) {
    const hamburgues: Hamburgues[] = hamburguesData;
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<null | Hamburgues>(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    /* Para o dialog */
    const [visible, setVisible] = useState(false);

    const openDialog = (product: Hamburgues) => {
        setSelectedProduct(product);
        setSelectedQuantity(1); // Reset quantity
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
    };

    const addToCart = () => {
        if (selectedProduct) {
            const pedido: Pedido = {
                id_produto: selectedProduct.id,
                type: selectedProduct.type,
                quantidade: selectedQuantity
            };
    
            // Encontrar o preço do produto selecionado pelo id
            const selectedProductPrice = hamburgues.find(product => product.id === selectedProduct.id)?.price ?? 0;
    
            // Calcular o preço total de todos os produtos já selecionados
            const totalPriceOfSelectedProducts = selectedProducts.reduce((total, product) => {
                const productPrice = hamburgues.find(hamburguesProduct => hamburguesProduct.id === product.id_produto)?.price ?? 0;
                // Adicionar o preço de cada produto ao total
                return total + productPrice * product.quantidade;
            }, 0);
    
            // Adicionar o preço do novo produto ao preço total
            const newTotalPrice = totalPriceOfSelectedProducts + selectedProductPrice * selectedQuantity;
    
            setTotalPrice(newTotalPrice);
            setSelectedProducts([...selectedProducts, pedido]);
    
            closeDialog();
        }
    };
    
    
    



    const incrementQuantity = () => {
        setSelectedQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setSelectedQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };


    return (
        <div className={`${styleMenu.divMenu}`}>
            <h1>Menu de Opções</h1>

            <Accordion className={`${styleAccordion.accordion}`}>
                <AccordionTab header={
                    <span className={`${styleAccordion.spanHeader}`}>
                        <Image src={`${iconHamburguer.src}`} alt='ícone hamburger' className={`${styleAccordion.icon}`} width={100} height={100} />
                        <span className={`${styleAccordion.textHeader}`}>Hamburgures</span>
                    </span>
                }>

                    <div>
                        {hamburgues.map((hamburgues, index) => (
                            hamburgues.type === 1 && (
                                <div key={index} className={`${styleAccordion.divProductos}`}>
                                    <div className={`${styleAccordion.divProductosInfo}`}>
                                        <h2>{hamburgues.name}</h2>
                                        <p>{hamburgues.description}</p>
                                        <p><strong>Ingredientes:</strong> {hamburgues.ingredients}</p>
                                        <p><strong>Preço:</strong> ${hamburgues.price.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <button className={`${styleAccordion.addCar}`} onClick={() => openDialog(hamburgues)}>Adicionar ao Carrinho</button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>









                </AccordionTab>
            </Accordion>

            <Accordion>
                <AccordionTab header="Pastéis">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </AccordionTab>
            </Accordion>


            <Dialog className={`${styleAccordion.dialog}`} visible={visible} style={{ width: '50vw', borderRadius: '20px' }} onHide={closeDialog}>
                {selectedProduct && (
                    <div className={`${styleAccordion.divDialog}`}>
                        <h2 className={`${styleAccordion.h2Dialog}`}>Selecione a quantidade desejada</h2>
                        <h3 className={`${styleAccordion.h3Dialog}`}>{selectedProduct.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button label='-' icon="pi pi-minus" onClick={decrementQuantity} className={`${styleAccordion.buttonDecrement}`} />
                            <span style={{ margin: '0 10px' }}>{selectedQuantity}</span>
                            <Button label='+' icon="pi pi-plus" onClick={incrementQuantity} className={`${styleAccordion.buttonIncrement}`} />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Button label="Adicionar ao Carrinho" className={`${styleAccordion.addCar}`} onClick={addToCart} />
                            <Button label="Cancelar" onClick={closeDialog} className={`${styleAccordion.cancel}`} />
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}