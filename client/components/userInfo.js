import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../apis/api.js';
import useAuth from '../hooks/useAuthorization.js';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from './buttons.module.css';

function UserInfo({ username }) { 
    const { auth, setAuth } = useAuth();
    const router = useRouter();
    const [changePasswordDetails, setChangePasswordDetails] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [changePasswordAlert, setChangePasswordAlert] = useState(false);
    const [changePasswordMsg, setChangePasswordMsg] = useState('');

    const handlePasswordChange = (e) => {
        setChangePasswordDetails({
            ...changePasswordDetails,
            [e.target.name]: e.target.value
        });
        setChangePasswordMsg(' ');
    };
    const changePasswordSubmit = async (e) => {
        e.preventDefault();
        if (changePasswordDetails.newPassword !== changePasswordDetails.confirmPassword) {
            setChangePasswordMsg("Change password failed: confirm password doesn't match new password");
            setChangePasswordAlert(true);
            return null
        }
        try {
            await API.put("/user/changepassword", {
                username: auth.username,
                oldPassword: changePasswordDetails.oldPassword,
                newPassword: changePasswordDetails.newPassword
            });
            setChangePasswordMsg("Password changed");
        } catch(err) {
            if (!err?.response) {
                setChangePasswordMsg("Change password failed: no server response");
            } else if (err.response?.status === 403) {
                setChangePasswordMsg("Change password failed: Current user doesn't exist");
            } else if (err.response?.status === 401) {
                setChangePasswordMsg("Change password failed: incorrect password");
            } else {
                setChangePasswordMsg("Change password failed");
            }
        };
        setChangePasswordAlert(true);
    }

    const signOut = async (e) => {
        e.preventDefault();
        await API.get("/auth/logout/"+auth.username, { withCredentials: true });
        setAuth({});
        router.push("/");
    }
    return (
        <section>
            <h3>Manage Account</h3>
            <button onClick={e => signOut(e)} className={buttonStyles.listDelete}>Sign Out</button>
            <h3>Change Password</h3>
            <form onSubmit={(e) => changePasswordSubmit(e)}>
                <label htmlFor="oldPassword">Enter old password: </label>
                <input 
                    type="password" 
                    id="oldPassword" 
                    name="oldPassword" 
                    placeholder="old password" 
                    className={utilStyles.textInput}
                    onChange={e => handlePasswordChange(e)}
                    required
                /><br/>
                <label htmlFor="newPassword">Enter new password: </label>
                <input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                    placeholder="new password"
                    className={utilStyles.textInput}
                    onChange={e => handlePasswordChange(e)}
                    required
                /><br/>
                <label htmlFor="confirmPassword">Confirm new password: </label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="confirm password"
                    className={utilStyles.textInput}
                    onChange={e => handlePasswordChange(e)}
                    required
                /><br/>
                <input type="submit" value="Change Password" className={buttonStyles.listEdit}/>
                {changePasswordAlert && <p>{changePasswordMsg}</p>}
            </form>
        </section>
    );
}


export default UserInfo
