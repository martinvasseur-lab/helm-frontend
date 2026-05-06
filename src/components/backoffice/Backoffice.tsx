import { useState } from "react";
import Sidebar from "./Sidebar";
import UserList from "./lists/UserList";
import ArticleList from "./lists/ArticleList";
import ProductList from "./lists/ProductList";
import styles from "./styles/Backoffice.module.css";
import LabelList from "./lists/LabelList";

type Section = "users" | "articles" | "labels" | "products";

export default function Backoffice() {
    const [section, setSection] = useState<Section>("users");

    return (
        <div className={styles.layout}>
            <Sidebar active={section} onChange={setSection} />
            <main className={styles.content}>
                {section === "users"    && <UserList />}
                {section === "articles" && <ArticleList />}
                {section === "labels" && <LabelList />}
                {section === "products" && <ProductList />}
            </main>
        </div>
    );
}
