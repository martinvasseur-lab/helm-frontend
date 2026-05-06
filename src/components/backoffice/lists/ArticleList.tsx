import { useEffect, useState } from "react";
import styles from "../styles/Backoffice.module.css";

interface Article {
    id: number;
    title: string;
    content: string;
    labels: string[];
    author_id: number;
}

export default function ArticleList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const token = "admin-token";

    useEffect(() => {
        fetch("http://localhost:5002/article/list")
            .then((r) => r.json())
            .then(setArticles);
    }, []);

    const deleteArticle = async (id: number) => {
        await fetch(`http://localhost:5002/article/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setArticles((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className={styles.contentTitle} style={{ margin: 0 }}>Articles</h2>
                <a href="/backoffice/article/create" className={styles.btnSecondary}>+ New article</a>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Labels</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.labels.join(", ")}</td>
                            <td>#{a.author_id}</td>
                            <td>
                                <div className={styles.actions}>
                                    <a href={`/backoffice/article/${a.id}`} className={styles.btnSecondary}>View</a>
                                    <a href={`/backoffice/article/${a.id}/update`} className={styles.btnSecondary}>Update</a>
                                    <button className={styles.btnDelete} onClick={() => deleteArticle(a.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
