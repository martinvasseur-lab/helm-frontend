import { useEffect, useState } from "react";
import styles from "../styles/Backoffice.module.css";

interface Product {
    id: number;
    name: string;
    price: number;
    categories: string[];
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const token = "admin-token";

    useEffect(() => {
        fetch("http://localhost:5003/product/list", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then(setProducts);
    }, []);

    const deleteProduct = async (id: number) => {
        await fetch(`http://localhost:5003/product/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className={styles.contentTitle} style={{ margin: 0 }}>Products</h2>
                <a href="/backoffice/product/create" className={styles.btnSecondary}>+ New product</a>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Categories</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.price} €</td>
                            <td>{p.categories.join(", ")}</td>
                            <td>
                                <div className={styles.actions}>
                                    <a href={`/backoffice/product/${p.id}`} className={styles.btnSecondary}>View</a>
                                    <a href={`/backoffice/product/${p.id}/update`} className={styles.btnSecondary}>Update</a>
                                    <button className={styles.btnDelete} onClick={() => deleteProduct(p.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
