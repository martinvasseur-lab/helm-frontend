import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard";
import styles from "./styles/TableArticle.module.css";


interface Post {
    id: number;
    title: string;
    content: string;
    labels: string[];
    image?: string;
    comments: Comment[];
}

export default function TableArticle() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("http://localhost:5002/article/list")
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
                        image={post.image}
                    />
                ))}
            </div>
        </div>
    );
}
