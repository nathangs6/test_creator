import { APIPrivate } from '../apis/api.js';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken.js';
import useAuth from './useAuthorization.js';
import { useRouter } from 'next/router';

const useAPIPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const requestIntercept = APIPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `BEARER ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = APIPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers['Authorization'] = `BEARER ${newAccessToken}`;
                        return APIPrivate(prevRequest);
                    } catch(err) {
                        router.push("/");
                        return null;
                    };
                }
                return Promise.reject(error);
            }
        );

        return () => {
            APIPrivate.interceptors.request.eject(requestIntercept);
            APIPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return APIPrivate;
}

export default useAPIPrivate;
