import { useContext } from 'react';
import AuthorizationContext from '../context/AuthorizationContext';

const useAuth = () => {
    return useContext(AuthorizationContext);
}

export default useAuth;
