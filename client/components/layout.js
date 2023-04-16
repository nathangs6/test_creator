import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';
import Header from './header.js';
import Footer from './footer.js';

const name = 'Nathan';

export default function Layout({ children }) {
    return (<div className={styles.container}>
        <Header/>
        <main>{children}</main>
        <Footer/>
    </div>);
}

