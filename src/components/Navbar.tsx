import { NavLink } from "react-router-dom";
import styles from "./styles/Navbar.module.css";

export default function Navbar() {
    const role = localStorage.getItem("role");
    const isAdmin = role === "admin" || role === "superadmin";

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <nav className={styles.nav}>
            <NavLink to="/" className={styles.logo}>Travel Blog</NavLink>
            <NavLink to="/article" className={getLinkClass}>Blog</NavLink>
            <NavLink to="/product" className={getLinkClass}>Produits</NavLink>
            <NavLink to="/contact" className={getLinkClass}>Contact</NavLink>
            {isAdmin && <NavLink to="/backoffice" className={getLinkClass}>Backoffice</NavLink>}
            <NavLink to="/login" className={styles.loginBtn}>Login</NavLink>
        </nav>
    );
}
