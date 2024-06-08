import styleHeader from '@/styles/header.module.css';
export default function Header() {
    return (
        <header className={`${styleHeader.header}`}>
            <a href="/">
                LOGO
            </a>
        </header>
    );
}