import styles from "./Card.module.css";

interface FormCardProps {
    title: string;
    onSubmit: () => void | Promise<void>;
    submitLabel?: string;
    loading?: boolean;
    footer?: React.ReactNode;
    children: React.ReactNode;
}

export { styles as formStyles };

export default function FormCard({
    title,
    onSubmit,
    submitLabel = "Submit",
    loading = false,
    footer,
    children,
}: FormCardProps) {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>{title}</h2>
                {children}
                <button
                    className={styles.button}
                    onClick={onSubmit}
                    disabled={loading}
                >
                    {loading ? "Loading..." : submitLabel}
                </button>
                {footer && <p className={styles.footer}>{footer}</p>}
            </div>
        </div>
    );
}
