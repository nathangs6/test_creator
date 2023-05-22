import API from '../apis/api.js';
import useAuth from './useAuthorization.js';
import { useRouter } from 'next/router';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const router = useRouter();

    const refresh = async () => {
        const response = await API.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.data.accessToken }
        });
        return response.data.data.accessToken;
    }

    return refresh;
};

export default useRefreshToken;
