import { useState } from 'react';
import API from '../apis/api.js';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from './buttons.module.css';

function UserInfo(username) { 
    const [changePasswordDetails, setChangePasswordDetails] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handlePasswordChange = (e) => {
        setChangePasswordDetails({
            ...changePasswordDetails,
            [e.target.name]: e.target.value
        });
    };
    const changePasswordSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <section>
            <h2>Change Password</h2>
            <form action={"http://localhost:3001/api/user/changepassword/" + username.username} method="POST">
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
            </form>
        </section>
    );
}


export default UserInfo
