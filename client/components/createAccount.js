import { useState } from 'react';
import API from '../apis/api.js';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from './buttons.module.css';
import loginStyles from './loginStyles.module.css';

export default function CreateAccount() {
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
            setCreateData({
                username: "",
                password: "",
                confirmPassword: ""
            });
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
    return (<section className={loginStyles.container}>
        <h1 className={loginStyles.heading}>Create Account</h1>
        <form onSubmit={e => handleCreateSubmit(e)}>
            <label htmlFor="username-input">Username</label><br/>
            <input
                type="text"
                name="username"
                placeholder="username"
                value={createData.username}
                className={utilStyles.textInput}
                onChange={e => handleCreateChange(e)}
            /><br/>
            <label htmlFor="password-input">Password</label><br/>
            <input 
                type="password"
                name="password"
                placeholder="password"
                value={createData.password}
                className={utilStyles.textInput}
                onChange={e => handleCreateChange(e)}
            /><br/>
            <label htmlFor="password-input">Confirm Password</label><br/>
            <input 
                type="password"
                name="confirmPassword"
                placeholder="password"
                value={createData.confirmPassword}
                className={utilStyles.textInput}
                onChange={e => handleCreateChange(e)}
            /><br/>
            <input type="submit" value="Create" className={[buttonStyles.listNew, loginStyles.button].join(" ")}/>
        </form>
        {createFailAlert && <p>{createFailMsg}</p>}
    </section>);
}
