import { createContext, useState } from 'react';

const AuthorizationContext = createContext({});

export const AuthorizationProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthorizationContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export default AuthorizationContext;
