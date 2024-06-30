import React from 'react';
import styleGalery from '@/styles/galery.module.css';
import { Galleria } from 'primereact/galleria';

// Definindo imagens a partir da pasta public
const images = [
    { itemImageSrc: '/lanche1.jpeg', alt: 'Lanche 1', title: 'Lanche 1' },
    { itemImageSrc: '/lanche2.jpeg', alt: 'Lanche 2', title: 'Lanche 2' },
    { itemImageSrc: '/lanche3.jpeg', alt: 'Lanche 1', title: 'Lanche 1' },
    { itemImageSrc: '/lanche3.jpeg', alt: 'Lanche 1', title: 'Lanche 1' },
    { itemImageSrc: '/lanche4.jpeg', alt: 'Lanche 1', title: 'Lanche 1' },
    { itemImageSrc: '/lanche5.jpeg', alt: 'Lanche 1', title: 'Lanche 1' },
    { itemImageSrc: '/lanche6.jpeg', alt: 'Lanche 1', title: 'Lanche 1' }
    // Adicione mais imagens conforme necessário
];

// Definindo opções responsivas
const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

// Template para renderizar os itens
const itemTemplate = (item: { itemImageSrc: string | undefined; alt: string | undefined; }) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', height:'50%' }} />;
};

// Template para renderizar os thumbnails
const thumbnailTemplate = (item: { thumbnailImageSrc: string | undefined; alt: string | undefined; }) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} />;
};

export default function Galery() {
    return (
        <div>
            <Galleria className={`${styleGalery.galery}`}  value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }}
                item={itemTemplate} circular autoPlay transitionInterval={2000} />
        </div>
    );
}