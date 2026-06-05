import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewArticle.module.css";

interface Label { id: number; name: string; }

interface Article {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    author_id: number;
    created_at: string;
    updated_at: string;
    labels: Label[];
}

export default function ViewArticle() {
    const { id } = useParams();
    const articleId = Number(id);
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5002/article/${articleId}`)
            .then((res) => res.json())
            .then(setArticle);
    }, [articleId]);

    if (!article) return <p>Loading...</p>;

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    {article.image_url
                        ? <img src={article.image_url} alt={article.title} className={styles.image} />
                        : <div className={styles.imagePlaceholder} />
                    }
                    <h2 className={styles.title}>{article.title}</h2>
                    {article.labels.length > 0 && (
                        <div className={styles.tags}>
                            {article.labels.map((l) => (
                                <span key={l.id} className={styles.tag}>{l.name}</span>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <span className={styles.label}>ID</span>
                        <span className={styles.value}>{article.id}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Author</span>
                        <span className={styles.value}>#{article.author_id}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Content</span>
                        <span className={styles.content}>{article.content}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Created at</span>
                        <span className={styles.value}>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Updated at</span>
                        <span className={styles.value}>{new Date(article.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className={styles.actions}>
                    <a href={`/backoffice/article/${article.id}/update`} className={styles.btnSecondary}>Update</a>
                </div>
            </div>
        </div>
    );
}
