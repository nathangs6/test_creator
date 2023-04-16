function UserInfo() { 
    return (
        <section>
            <h2>Change Password</h2>
            <form>
                <label htmlFor="old-password">Enter old password: </label>
                <input type="text" id="old-password" name="old-password" placeholder="old password"/><br/>
                <label htmlFor="new-password">Enter new password: </label>
                <input type="text" id="new-password" name="new-password" placeholder="new password"/><br/>
                <label htmlFor="confirm-password">Confirm new password: </label>
                <input type="text" id="confirm-password" name="confirm-password" placeholder="confirm password"/><br/>
                <input type="submit" value="Change Password"/>
            </form>
        </section>
    );
}


export default UserInfo
