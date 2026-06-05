import { useEffect, useState } from "react";
import ArticleCard from "./CardArticle";
import styles from "./ListArticles.module.css";

interface Label { id: number; name: string; }

interface Post {
    id: number;
    title: string;
    content: string;
    labels: Label[];
    image_url?: string;
    comments: Comment[];
}

export default function ListArticles() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("http://localhost:5002/article")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <div className={styles.page}>
            <a href="/article/create">
                <button className={styles.createBtn}>+ New article</button>
            </a>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <ArticleCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        labels={post.labels}
                        image={post.image_url}
                    />
                ))}
            </div>
        </div>
    );
}
