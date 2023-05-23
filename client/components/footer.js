import utilStyles from '../styles/utils.module.css';
import layoutStyles from './layout.module.css';
export const siteTitle = 'Practice Test Generator';

export default function Footer() {
    return (
        <footer>
            <hr className={layoutStyles.footerSeparator}/>
            <p className={utilStyles.noMargin}>Author: <a href="https://github.com/nathangs6/">Nathan Gurrin-Smith</a></p>
            <p className={utilStyles.noMargin}>Code: <a href="https://github.com/nathangs6/testCreator">here</a></p>
        </footer>
    );
}

