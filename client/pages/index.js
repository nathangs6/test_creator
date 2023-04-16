import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/layout.js';
import utilStyles from '../styles/utils.module.css';

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
            <h1>Practice Test Creator</h1>
            <p>Generate some practice tests</p>
        </div>
        <section>
            <h1>Login</h1>
            <form>
                <label htmlFor="username-input">Username: </label>
                <input type="text" id="username-input" name="username-input" placeholder="username"/><br/>
                <label htmlFor="password-input">Password: </label>
                <input type="text" id="password-input" name="password-input" placeholder="password"/><br/>
                <input type="submit" value="Login"/>
            </form>
        </section>
    </Layout>);
}
