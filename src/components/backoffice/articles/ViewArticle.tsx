import { useEffect, useState } from "react";
import styles from "../styles/Backoffice.module.css";

interface Article {
    id: number;
    title: string;
    content: string;
    labels: string[];
    author_id: number;
}

export default function ViewArticle({ articleId }: { articleId: number }) {
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5002/article/${articleId}`)
            .then((res) => res.json())
            .then(setArticle);
    }, [articleId]);

    if (!article) return <p>Loading...</p>;

    return (
        <>
            <h2 className={styles.contentTitle}>{article.title}</h2>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td><strong>ID</strong></td>
                        <td>{article.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Author</strong></td>
                        <td>#{article.author_id}</td>
                    </tr>
                    <tr>
                        <td><strong>Labels</strong></td>
                        <td>
                            <div className={styles.actions}>
                                {article.labels.map((l) => (
                                    <span key={l} className={`${styles.badge} ${styles.badgeUser}`}>{l}</span>
                                ))}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Content</strong></td>
                        <td>{article.content}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
