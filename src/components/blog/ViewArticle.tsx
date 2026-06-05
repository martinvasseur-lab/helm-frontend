import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewArticle.module.css";

interface Comment {
    id: number;
    content: string;
    author_id: number;
}

interface Label { id: number; name: string; }

interface Article {
    id: number;
    title: string;
    content: string;
    labels: Label[];
    image_url?: string;
    comments: Comment[];
}

export default function ViewArticle() {
    const { id } = useParams();
    const articleId = Number(id);
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5002/article/${articleId}`)
            .then((res) => res.json())
            .then((data) => setArticle(data));
    }, [articleId]);

    if (!article) return <div className={styles.page}>Loading...</div>;

    return (
        <div className={styles.page}>
            <a href="/article" className={styles.backLink}>← Back to articles</a>
            <div className={styles.container}>
                {article.image_url
                    ? <img src={article.image_url} alt={article.title} className={styles.image} />
                    : <div className={styles.imagePlaceholder} />
                }

                <div className={styles.body}>
                    <h1 className={styles.title}>{article.title}</h1>
                    {article.labels.length > 0 && (
                        <div className={styles.labels}>
                            {article.labels.map((l) => <span key={l.id} className={styles.label}>{l.name}</span>)}
                        </div>
                    )}

                    <p className={styles.content}>{article.content}</p>

                    <hr className={styles.divider} />

                    <h2 className={styles.commentsTitle}>Comments ({article.comments.length})</h2>
                    {article.comments.length === 0
                        ? <p className={styles.empty}>No comments yet.</p>
                        : (
                            <div className={styles.commentList}>
                                {article.comments.map((c) => (
                                    <div key={c.id} className={styles.comment}>
                                        <p className={styles.commentContent}>{c.content}</p>
                                        <p className={styles.commentAuthor}>Author #{c.author_id}</p>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
