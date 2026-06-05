import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import heroImg from "../../assets/image/Home/Voyage Japon.jpg";
import ArticleCard from "../blog/CardArticle";
import ProductCard from "../product/CardProduct";
import Carousel from "../Carousel";

interface Label { id: number; name: string }
interface Article { id: number; title: string; labels: Label[]; image?: string; }
interface Category { id: number; name: string; }
interface Product { id: number; name: string; price: number; categories: Category[]; image?: string; }

const links = [
    { to: "/article", icon: "✍️", title: "Blog",     desc: "Articles and travel stories" },
    { to: "/product", icon: "🎒", title: "Products", desc: "Travel gear I recommend" },
    { to: "/contact", icon: "✉️", title: "Contact",  desc: "Get in touch with me" },
];

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5002/article/list")
            .then(r => r.json())
            .then(setArticles)
            .catch(() => {});
        fetch("http://localhost:5003/product")
            .then(r => r.json())
            .then(setProducts)
            .catch(() => {});
    }, []);

    return (
        <>
            <section className={styles.hero}>
                <img src={heroImg} alt="hero" className={styles.heroImage} />
                <h1 className={styles.heroTitle}>Travel Blog</h1>
                <p className={styles.heroSub}>Exploring the world, one story at a time</p>
                <a href="/article" className={styles.heroBtn}>Read the blog</a>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Explore</h2>
                <div className={styles.grid}>
                    {links.map(({ to, icon, title, desc }) => (
                        <a key={to} href={to} className={styles.card}>
                            <span className={styles.cardIcon}>{icon}</span>
                            <h3 className={styles.cardTitle}>{title}</h3>
                            <p className={styles.cardDesc}>{desc}</p>
                        </a>
                    ))}
                </div>
            </section>

            <section className={styles.whoAmI}>
                <h2 className={styles.sectionTitle}>Who Am I?</h2>
                <div className={styles.whoAmIContent}>
                    <img src={heroImg} alt="portrait" className={styles.whoAmIPhoto} />
                    <p className={styles.whoAmIText}>
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                    </p>
                </div>
            </section>

            {articles.length > 0 && (
                <section className={styles.section} style={{ backgroundColor: "#f0f8ff" }}>
                    <h2 className={styles.sectionTitle}>Latest Articles</h2>
                    <Carousel
                        items={articles}
                        renderItem={(a: Article) => <ArticleCard id={a.id} title={a.title} labels={a.labels} image={a.image} />}
                    />
                    <div className={styles.seeAll}>
                        <a href="/article" className={styles.seeAllLink}>See all articles →</a>
                    </div>
                </section>
            )}

            {products.length > 0 && (
                <section className={styles.section} style={{ backgroundColor: "#ffffff" }}>
                    <h2 className={styles.sectionTitle}>Featured Products</h2>
                    <Carousel
                        items={products}
                        renderItem={(p: Product) => <ProductCard id={p.id} name={p.name} price={p.price} categories={p.categories} image={p.image} />}
                    />
                    <div className={styles.seeAll}>
                        <a href="/product" className={styles.seeAllLink}>See all products →</a>
                    </div>
                </section>
            )}
        </>
    );
}
