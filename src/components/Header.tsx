import styleHeader from '@/styles/header.module.css';
import Link from 'next/link';
import { Button } from 'primereact/button';
export default function Header() {
    return (
        <header className={`${styleHeader.header}`}>
            <Link href="">
                LOGO
            </Link> 
        </header>
    );
}