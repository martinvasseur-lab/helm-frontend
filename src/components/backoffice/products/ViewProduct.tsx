import { useEffect, useState } from "react";
import styles from "../styles/Backoffice.module.css";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    categories: string[];
}

export default function ViewProduct({ productId }: { productId: number }) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5003/product/${productId}`)
            .then((res) => res.json())
            .then(setProduct);
    }, [productId]);

    if (!product) return <p>Loading...</p>;

    return (
        <>
            <h2 className={styles.contentTitle}>{product.name}</h2>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td><strong>ID</strong></td>
                        <td>{product.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Price</strong></td>
                        <td>{product.price} €</td>
                    </tr>
                    <tr>
                        <td><strong>Description</strong></td>
                        <td>{product.description}</td>
                    </tr>
                    <tr>
                        <td><strong>Categories</strong></td>
                        <td>
                            <div className={styles.actions}>
                                {product.categories.map((c) => (
                                    <span key={c} className={`${styles.badge} ${styles.badgeUser}`}>{c}</span>
                                ))}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.actions} style={{ marginTop: "1rem" }}>
                <a href={`/backoffice/product/${product.id}`} className={styles.btnSecondary}>Update</a>
            </div>
        </>
    );
}
