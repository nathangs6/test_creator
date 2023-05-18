import utilStyles from '../styles/utils.module.css';
import buttonStyles from './buttons.module.css';

function UserInfo(username) { 
    return (
        <section>
            <h2>Change Password</h2>
            <form action={"http://localhost:3001/api/user/changepassword/" + username.username} method="POST">
                <label htmlFor="oldPassword">Enter old password: </label>
                <input 
                    type="text" 
                    id="oldPassword" 
                    name="oldPassword" 
                    placeholder="old password" 
                    className={utilStyles.textInput}
                    required
                /><br/>
                <label htmlFor="newPassword">Enter new password: </label>
                <input 
                    type="text" 
                    id="newPassword" 
                    name="newPassword" 
                    placeholder="new password"
                    className={utilStyles.textInput}
                    required
                /><br/>
                <label htmlFor="confirmPassword">Confirm new password: </label>
                <input 
                    type="text" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="confirm password"
                    className={utilStyles.textInput}
                    required
                /><br/>
                <input type="submit" value="Change Password" className={buttonStyles.listEdit}/>
            </form>
        </section>
    );
}


export default UserInfo
