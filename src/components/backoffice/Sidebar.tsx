import styles from "./Sidebar.module.css";

type Section = "users" | "articles" | "labels" | "products" | "categories" | "contacts";

interface SidebarProps {
    active: Section;
    onChange: (s: Section) => void;
}

const items: { key: Section; label: string }[] = [
    { key: "users",    label: "Users" },
    { key: "articles", label: "Articles" },
    { key: "labels", label: "Labels" },
    { key: "products", label: "Products" },
    { key: "categories", label: "Categories" },
    { key: "contacts", label: "Contacts" },
];

export default function Sidebar({ active, onChange }: SidebarProps) {
    return (
        <aside className={styles.sidebar}>
            <p className={styles.sidebarTitle}>Backoffice</p>
            {items.map(({ key, label }) => (
                <button
                    key={key}
                    className={`${styles.sidebarBtn} ${active === key ? styles.active : ""}`}
                    onClick={() => onChange(key)}
                >
                    {label}
                </button>
            ))}
        </aside>
    );
}
