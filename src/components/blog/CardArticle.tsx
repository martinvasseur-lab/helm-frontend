import styles from "./CardArticle.module.css";

interface Label { id: number; name: string; }

interface ArticleCardProps {
    id: number;
    title: string;
    labels: Label[];
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
                        {labels.map((l) => <span key={l.id} className={styles.label}>{l.name}</span>)}
                    </div>
                )}
            </div>
        </a>
    );
}
