import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../apis/api.js';
import useAuth from '../hooks/useAuthorization.js';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from './buttons.module.css';
import loginStyles from './loginStyles.module.css';

export default function Login() {
    const { setAuth } = useAuth();
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
    return (<section className={loginStyles.container}>
            <h1 className={loginStyles.heading}>Login</h1>
            <form onSubmit={e => handleLoginSubmit(e)}>
                <label htmlFor="username-input">Username</label><br/>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="username"
                    value={loginData.username}
                    className={utilStyles.textInput}
                    onChange={e => handleLoginChange(e)}
                /><br/>
                <label htmlFor="password-input">Password</label><br/>
                <input 
                    type="password"
                    name="password"
                    placeholder="password"
                    value={loginData.password}
                    className={utilStyles.textInput}
                    onChange={e => handleLoginChange(e)}
                /><br/>
                <input type="submit" value="Login" className={[buttonStyles.listNew, loginStyles.button].join(" ")}/>
            </form>
            {loginFailAlert && <p>{loginFailMsg}</p>}
    </section>);
}
