import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import API from '../apis/api.js';
import AuthAPI from '../apis/authAPI.js';
import AuthorizationContext from '../context/AuthorizationContext.js';
import Layout from '../components/layout.js';
import { NotificationModal } from '../components/modals/modal.js';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from '../components/buttons.module.css';

export default function Home() {
    const { setAuth } = useContext(AuthorizationContext);
    const router = useRouter();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [loginFailAlert, setLoginFailAlert] = useState(false);
    const [loginFailMsg, setLoginFailMsg] = useState('');

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
        setLoginFailAlert(false);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/auth/login", loginData, {
                withCredentials: true
            });
            const accessToken = response.data.data.accessToken;
            const username = response.data.data.username;
            setAuth({ username, accessToken });
            router.push("/"+username);
        } catch(err) {
            if (!err?.response) {
                setLoginFailMsg("Login failed: no server response");
            } else if (err.response?.status === 403) {
                setLoginFailMsg("Login failed: username doesn't exist");
            } else if (err.response?.status === 401) {
                setLoginFailMsg("Login failed: incorrect password");
            } else {
                setLoginFailMsg("Login failed");
            }
            setLoginFailAlert(true);
            return false;
        };
    };


    const [createData, setCreateData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [createFailAlert, setCreateFailAlert] = useState(false);
    const [createFailMsg, setCreateFailMsg] = useState('');

    const handleCreateChange = (e) => {
        setCreateData({
            ...createData,
            [e.target.name]: e.target.value
        });
        setCreateFailAlert(false);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            if (createData.password !== createData.confirmPassword) {
                setCreateFailMsg("Create account failed: passwords don't match");
                setCreateFailAlert(true);
                return null;
            }
            const response = await API.post("/user/create", createData);
            setCreateFailMsg("Account created");
            setCreateFailAlert(true);
        } catch(err) {
            if (!err) {
                setCreateFailMsg("Create account failed: no server response");
            } else if (err.response?.status === 403) {
                setCreateFailMsg("Create account failed: username already exists");
            } else {
                setCreateFailMsg("Create account failed");
            }
            setCreateFailAlert(true);
            return null;
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
                    type="password"
                    name="password"
                    placeholder="password"
                    value={loginData.password}
                    className={utilStyles.textInput}
                    onChange={e => handleLoginChange(e)}
                /><br/>
                <input type="submit" value="Login" className={buttonStyles.listNew}/>
            </form>
            {loginFailAlert && <p>{loginFailMsg}</p>}

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
                    type="password"
                    name="password"
                    placeholder="password"
                    value={createData.password}
                    className={utilStyles.textInput}
                    onChange={e => handleCreateChange(e)}
                /><br/>
                <label htmlFor="password-input">Confirm Password: </label>
                <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="password"
                    value={createData.confirmPassword}
                    className={utilStyles.textInput}
                    onChange={e => handleCreateChange(e)}
                /><br/>
                <input type="submit" value="Create" className={buttonStyles.listNew}/>
            </form>
            {createFailAlert && <p>{createFailMsg}</p>}
        </section>
    </Layout>);
}
