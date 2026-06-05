import { useEffect, useState } from "react";
import styles from "../Backoffice.module.css";

interface Category {
    id: number;
    name: string;
}

export default function ListCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const token = "admin-token";

    useEffect(() => {
        fetch("http://localhost:5003/filter")
            .then((r) => r.json())
            .then(setCategories);
    }, []);

    const deleteCategory = async (id: number) => {
        await fetch(`http://localhost:5003/filter/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setCategories((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className={styles.contentTitle} style={{ margin: 0 }}>Categories</h2>
                <a href="/backoffice/category/create" className={styles.btnSecondary}>+ New Category</a>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th><strong>Id</strong></th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((c) => (
                        <tr key={c.id}>
                            <td><strong>{c.id}</strong></td>
                            <td>{c.name}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.btnDelete} onClick={() => deleteCategory(c.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}