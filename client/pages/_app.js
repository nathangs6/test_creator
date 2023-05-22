import '../styles/global.css';
import { AuthorizationProvider } from '../context/AuthorizationContext.js';

export default function App({ Component, pageProps }) {
    return (<AuthorizationProvider>
        <Component {...pageProps}/>
    </AuthorizationProvider>)
}
