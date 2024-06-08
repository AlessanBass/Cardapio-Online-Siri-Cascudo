import styleMenu from '@/styles/menu.module.css';
import styleAccordion from '@/styles/acorddion.module.css';
import React, { useRef, useState } from 'react';
import iconHamburguer from '../../public/icon_hamburguer.png';
import iconPastel from '../../public/icon_pastel.png';
import iconCombo from '../../public/icon_combo.png';
import Image from 'next/image';
import hamburguesData from '@/products/hamburgues.json';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

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
    const toast = useRef<Toast>(null);
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

            toast.current?.show({ closable: false, summary: 'Sucesso', detail: 'Produto adicionado ao carrinho!', life: 3000 });

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
            <Toast ref={toast} position="top-center" className={`${styleAccordion.marg} ${styleAccordion.ptoasttopcenter}`} baseZIndex={1000} />

            <h1 className={`${styleMenu.h1}`}>Menu de Opções</h1>

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
                                        <h2 className={`${styleMenu.nameProduct}`}>{hamburgues.name}</h2>
                                        <p>{hamburgues.description}</p>
                                        <p className={`${styleMenu.ingredients}`}><strong>Ingredientes:</strong> {hamburgues.ingredients}</p>
                                        <p className={`${styleMenu.price}`}><strong>Preço:</strong> R${hamburgues.price.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <button className={`${styleAccordion.iconAddCart}`} onClick={() => openDialog(hamburgues)}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </AccordionTab>
            </Accordion>

            <Accordion className={`${styleAccordion.accordion}`}>
                <AccordionTab header={
                    <span className={`${styleAccordion.spanHeader}`}>
                        <Image src={`${iconPastel.src}`} alt='ícone Pastel' className={`${styleAccordion.icon}`} width={100} height={100} />
                        <span className={`${styleAccordion.textHeader}`}>Pastéis</span>
                    </span>
                }>

                    <div>
                        {hamburgues.map((hamburgues, index) => (
                            hamburgues.type === 2 && (
                                <div key={index} className={`${styleAccordion.divProductos}`}>
                                    <div className={`${styleAccordion.divProductosInfo}`}>
                                        <h2 className={`${styleMenu.nameProduct}`}>{hamburgues.name}</h2>
                                        <p>{hamburgues.description}</p>
                                        <p className={`${styleMenu.ingredients}`}><strong>Ingredientes:</strong> {hamburgues.ingredients}</p>
                                        <p className={`${styleMenu.price}`}><strong>Preço:</strong> R${hamburgues.price.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <button className={`${styleAccordion.iconAddCart}`} onClick={() => openDialog(hamburgues)}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </AccordionTab>
            </Accordion>

            <Accordion className={`${styleAccordion.accordion}`}>
                <AccordionTab header={
                    <span className={`${styleAccordion.spanHeader}`}>
                        <Image src={`${iconCombo.src}`} alt='ícone combos' className={`${styleAccordion.icon}`} width={100} height={100} />
                        <span className={`${styleAccordion.textHeader}`}>Combos</span>
                    </span>
                }>  

                    <div>
                        {hamburgues.map((hamburgues, index) => (
                            hamburgues.type === 3 && (
                                <div key={index} className={`${styleAccordion.divProductos}`}>
                                    <div className={`${styleAccordion.divProductosInfo}`}>
                                        <h2 className={`${styleMenu.nameProduct}`}>{hamburgues.name}</h2>
                                        <p>{hamburgues.description}</p>
                                        <p className={`${styleMenu.ingredients}`}><strong>Ingredientes:</strong> {hamburgues.ingredients}</p>
                                        <p className={`${styleMenu.price}`}><strong>Preço:</strong> R${hamburgues.price.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <button className={`${styleAccordion.iconAddCart}`} onClick={() => openDialog(hamburgues)}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </AccordionTab>
            </Accordion>


            <Dialog className={`${styleAccordion.dialog}`} visible={visible} onHide={closeDialog}>
                {selectedProduct && (
                    <div className={`${styleAccordion.divDialog}`}>
                        <i className={`fa-solid fa-cart-shopping ${styleAccordion.iconDialog}`}></i>
                        <h2 className={`${styleAccordion.h2Dialog}`}>Selecione a quantidade desejada</h2>
                        <h3 className={`${styleAccordion.h3Dialog}`}>{selectedProduct.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button icon="fa fa-minus" onClick={decrementQuantity} className={`${styleAccordion.buttonDecrement}`} />
                            <span style={{ margin: '0 10px' }}>{selectedQuantity}</span>
                            <Button icon="fa-solid fa-plus" onClick={incrementQuantity} className={`${styleAccordion.buttonIncrement}`} />
                        </div>
                        <div className={`${styleAccordion.divButonsDialog}`} style={{ marginTop: '20px' }}>
                            <Button label="Adicionar ao Carrinho" className={`${styleAccordion.addCar}`} onClick={addToCart} />
                            <Button label="Cancelar" onClick={closeDialog} className={`${styleAccordion.cancel}`} />
                        </div>
                    </div>
                )}
            </Dialog>

        </div>
    );
}