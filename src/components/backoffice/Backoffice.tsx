import { useState } from "react";
import Sidebar from "./Sidebar";
import ListUsers from "./users/ListUsers";
import ListArticles from "./articles/ListArticles";
import ListProducts from "./products/ListProducts";
import ListLabels from "./labels/ListLabels";
import ListCategories from "./categories/ListCategories";
import ListContacts from "./contacts/ListContacts";
import styles from "./Backoffice.module.css";

type Section = "users" | "articles" | "labels" | "products" | "categories" | "contacts";

export default function Backoffice() {
    const [section, setSection] = useState<Section>("users");

    return (
        <div className={styles.layout}>
            <Sidebar active={section} onChange={setSection} />
            <main className={styles.content}>
                {section === "users"      && <ListUsers />}
                {section === "articles"   && <ListArticles />}
                {section === "labels"     && <ListLabels />}
                {section === "products"   && <ListProducts />}
                {section === "categories" && <ListCategories />}
                {section === "contacts"   && <ListContacts />}
            </main>
        </div>
    );
}
