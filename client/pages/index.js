import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/layout.js';
import Login from '../components/login.js';
import CreateAccount from '../components/createAccount.js';
import utilStyles from '../styles/utils.module.css';
import loginStyles from '../components/loginStyles.module.css';

export default function Home() {
    return (<Layout>
        <div className={utilStyles.centre}>
            <Image
                src="/images/logo.png"
                height={144}
                width={144}
                alt="Logo"
                style={{ margin: "auto", }}
            />
            <h1 className={loginStyles.titleHeading}>Practice Test Creator</h1>
        </div>
        <Login/>
        <hr className={loginStyles.separator}/>
        <CreateAccount/>
    </Layout>);
}
