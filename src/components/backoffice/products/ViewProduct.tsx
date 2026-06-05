import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewProduct.module.css";

interface Category { id: number; name: string; }

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image_url?: string;
    stock: number;
    created_at: string;
    updated_at: string;
    categories: Category[];
}

export default function ViewProduct() {
    const { id } = useParams();
    const productId = Number(id);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5003/product/${productId}`)
            .then((res) => res.json())
            .then(setProduct);
    }, [productId]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    {product.image_url
                        ? <img src={product.image_url} alt={product.name} className={styles.image} />
                        : <div className={styles.imagePlaceholder} />
                    }
                    <h2 className={styles.name}>{product.name}</h2>
                    {product.categories.length > 0 && (
                        <div className={styles.tags}>
                            {product.categories.map((c) => (
                                <span key={c.id} className={styles.tag}>{c.name}</span>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <span className={styles.label}>ID</span>
                        <span className={styles.value}>{product.id}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Price</span>
                        <span className={styles.value}>{product.price} €</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Stock</span>
                        <span className={styles.value}>{product.stock}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Description</span>
                        <span className={styles.value}>{product.description ?? "—"}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Created at</span>
                        <span className={styles.value}>{new Date(product.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Updated at</span>
                        <span className={styles.value}>{new Date(product.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className={styles.actions}>
                    <a href={`/backoffice/product/${product.id}/update`} className={styles.btnSecondary}>Update</a>
                </div>
            </div>
        </div>
    );
}
