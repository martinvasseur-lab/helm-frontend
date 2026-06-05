import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span>© {new Date().getFullYear()} Travel Blog</span>
            <nav className={styles.links}>
                <NavLink to="/article" className={styles.link}>Blog</NavLink>
                <NavLink to="/product" className={styles.link}>Produits</NavLink>
                <NavLink to="/contact" className={styles.link}>Contact</NavLink>
            </nav>
        </footer>
    );
}
