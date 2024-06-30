import styleContact from '@/styles/contact.module.css';
import Galery from './Galery';
export default function Contact() {
    return(
        <div className={`${styleContact.contact}`}>
            <h1 className={`${styleContact.h1}`}>Confira nossos produtos</h1>
            <div>
                <Galery/>
            </div>
        </div>
    );
}