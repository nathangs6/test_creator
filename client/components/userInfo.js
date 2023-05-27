import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../apis/api.js';
import useAPIPrivate from '../hooks/useAPIPrivate.js'
import useAuth from '../hooks/useAuthorization.js';
import { SmallModal } from './modals/modal.js';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from './buttons.module.css';
import loginStyles from './loginStyles.module.css';
import modalStyles from './modals/modal.module.css';

function UserInfo({ username }) { 
    const { auth, setAuth } = useAuth();
    const router = useRouter();
    const [changePasswordDetails, setChangePasswordDetails] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [changePasswordAlert, setChangePasswordAlert] = useState(false);
    const [changePasswordStatus, setChangePasswordStatus] = useState('');
    const [changePasswordMsg, setChangePasswordMsg] = useState('');

    const handlePasswordChange = (e) => {
        setChangePasswordDetails({
            ...changePasswordDetails,
            [e.target.name]: e.target.value
        });
        setChangePasswordStatus('');
        setChangePasswordMsg('');
    };
    const changePasswordSubmit = async (e) => {
        e.preventDefault();
        if (changePasswordDetails.newPassword !== changePasswordDetails.confirmPassword) {
            setChangePasswordStatus("Failed");
            setChangePasswordMsg("confirm password doesn't match new password");
            setChangePasswordAlert(true);
            return null
        }
        try {
            await API.put("/user/changepassword", {
                username: auth.username,
                oldPassword: changePasswordDetails.oldPassword,
                newPassword: changePasswordDetails.newPassword
            });
            setChangePasswordStatus("Password changed");
            setChangePasswordDetails({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch(err) {
            setChangePasswordStatus("Failed");
            if (!err?.response) {
                setChangePasswordMsg("no server response");
            } else if (err.response?.status === 403) {
                setChangePasswordMsg("current user doesn't exist");
            } else if (err.response?.status === 401) {
                setChangePasswordMsg("incorrect password");
            } else {
                setChangePasswordMsg("change password failed");
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

    const [isOpen, setOpen] = useState(false);

    return (
        <section className={loginStyles.container}>
            <h3 className={loginStyles.heading}>Change Password</h3>
            <form onSubmit={(e) => changePasswordSubmit(e)}>
                <label htmlFor="oldPassword">Enter old password</label><br/>
                <input 
                    type="password" 
                    id="oldPassword" 
                    name="oldPassword" 
                    placeholder="old password" 
                    value={changePasswordDetails.oldPassword}
                    className={utilStyles.textInput}
                    onChange={e => handlePasswordChange(e)}
                    required
                /><br/>
                <label htmlFor="newPassword">Enter new password</label><br/>
                <input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                    placeholder="new password"
                    value={changePasswordDetails.newPassword}
                    className={utilStyles.textInput}
                    onChange={e => handlePasswordChange(e)}
                    required
                /><br/>
                <label htmlFor="confirmPassword">Confirm new password</label><br/>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="confirm password"
                    value={changePasswordDetails.confirmPassword}
                    className={utilStyles.textInput}
                    onChange={e => handlePasswordChange(e)}
                    required
                /><br/>
                <input type="submit" value="Change Password" className={buttonStyles.listEdit}/>
                {changePasswordAlert && <>
                <p className={utilStyles.noMargin}>{changePasswordStatus}</p>
                    <p className={utilStyles.noMargin}>{changePasswordMsg}</p></>}
            </form>
            <hr className={loginStyles.containerRule}/>
            <button onClick={e => signOut(e)} className={buttonStyles.listDelete}>Sign Out</button>
            <hr className={loginStyles.containerRule}/>
            <button onClick={() => setOpen(true)} className={buttonStyles.listDelete}>Delete Account</button>
            {isOpen && <DeleteUserForm setOpen={setOpen} username={username}/>}
        </section>
    );
}

function DeleteUserForm({ setOpen, username }) {
    const router = useRouter();
    const modalTitle = "Delete Account";
    const [deletePassword, setDeletePassword] = useState("");
    const [deletePasswordMsg, setDeletePasswordMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(deletePassword);
            const response = await API.put("/user/delete/"+username, { password: deletePassword });
            if (response) {
                router.push("/");
            }
        } catch(err) {
            if (!err?.response) {
                setDeletePasswordMsg("no server response");
            } else if (err.response?.status === 401) {
                setDeletePasswordMsg("incorrect password");
            } else {
                setDeletePasswordMsg("account deletion failed");
            }
        };
    };

    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="delete">
        Enter your password to delete user {username}.<br/>
        <input 
            className={modalStyles.smallTextarea}
            type="password" 
            placeholder="password"
            value={deletePassword}
            onChange={e => setDeletePassword(e.target.value)}/>
        <p>{ deletePasswordMsg }</p>
    </SmallModal>);
};


export default UserInfo
