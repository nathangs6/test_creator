import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import API from '../apis/api.js';
import Layout from '../components/layout.js';
import { NotificationModal } from '../components/modals/modal.js';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from '../components/buttons.module.css';

export default function Home() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [loginFailModal, setLoginFailModal] = useState(false);

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/user/login", loginData);
            window.location.href = '/users/'+loginData.username;
        } catch(err) {
            setLoginFailModal(true);
            return false;
        };
    };


    const [createData, setCreateData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleCreateChange = (e) => {
        setCreateData({
            ...createData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/user/create", createData);
            window.location.href = '/users/' + createData.username;
        } catch(err) {
            window.alert("Create account failed!");
            return false;
        };
    };


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
            <form onSubmit={e => handleLoginSubmit(e)}>
                <label htmlFor="username-input">Username: </label>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="username"
                    value={loginData.username}
                    className={utilStyles.textInput}
                    onChange={e => handleLoginChange(e)}
                /><br/>
                <label htmlFor="password-input">Password: </label>
                <input 
                    type="text"
                    name="password"
                    placeholder="password"
                    value={loginData.password}
                    className={utilStyles.textInput}
                    onChange={e => handleLoginChange(e)}
                /><br/>
                <input type="submit" value="Login" className={buttonStyles.listNew}/>
            </form>
            {loginFailModal && <NotificationModal setOpen={setLoginFailModal} modalTitle="Login Failed">
                Either your password was incorrect or the user doesn't exist!
            </NotificationModal>}


            <h1>Create Account</h1>
            <form onSubmit={e => handleCreateSubmit(e)}>
                <label htmlFor="username-input">Username: </label>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={createData.username}
                    className={utilStyles.textInput}
                    onChange={e => handleCreateChange(e)}
                /><br/>
                <label htmlFor="password-input">Password: </label>
                <input 
                    type="text"
                    name="password"
                    placeholder="password"
                    value={createData.password}
                    className={utilStyles.textInput}
                    onChange={e => handleCreateChange(e)}
                /><br/>
                <label htmlFor="password-input">Confirm Password: </label>
                <input 
                    type="text"
                    name="confirmPassword"
                    placeholder="password"
                    value={createData.confirmPassword}
                    className={utilStyles.textInput}
                    onChange={e => handleCreateChange(e)}
                /><br/>
                <input type="submit" value="Create" className={buttonStyles.listNew}/>
            </form>
        </section>
    </Layout>);
}
