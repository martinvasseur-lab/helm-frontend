import styles from "./styles/ArticleCard.module.css";

interface ArticleCardProps {
    id: number;
    title: string;
    labels: string[];
    image?: string;
}

export default function ArticleCard({ id, title, labels, image }: ArticleCardProps) {
    return (
        <a href={`/article/${id}`} className={styles.card} style={{ textDecoration: "none" }}>
            {image
                ? <img src={image} alt={title} className={styles.image} />
                : <div className={styles.imagePlaceholder} />
            }
            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                {labels.length > 0 && (
                    <div className={styles.labels}>
                        {labels.map((l) => <span key={l} className={styles.label}>{l}</span>)}
                    </div>
                )}
            </div>
        </a>
    );
}
