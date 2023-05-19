import utilStyles from '../styles/utils.module.css';
export const siteTitle = 'Practice Test Generator';

export default function Footer() {
    return (
        <footer>
            <hr/>
            <p className={utilStyles.noMargin}>Author: Nathan Gurrin-Smith</p>
        </footer>
    );
}

