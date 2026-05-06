import { useEffect, useState } from "react";
import styles from "./styles/ProductDetail.module.css";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    categories: string[];
    image?: string;
}

export default function ProductDetail({ productId }: { productId: number }) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5003/product/${productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [productId]);

    if (!product) return <div className={styles.page}>Loading...</div>;

    return (
        <div className={styles.page}>
            <a href="/product" className={styles.backLink}>← Back to products</a>
            <div className={styles.container}>
                {product.image
                    ? <img src={product.image} alt={product.name} className={styles.image} />
                    : <div className={styles.imagePlaceholder} />
                }
                <div className={styles.body}>
                    <h1 className={styles.name}>{product.name}</h1>
                    <p className={styles.price}>{product.price} €</p>
                    {product.categories.length > 0 && (
                        <div className={styles.categories}>
                            {product.categories.map((c) => <span key={c} className={styles.category}>{c}</span>)}
                        </div>
                    )}
                    <p className={styles.description}>{product.description}</p>
                </div>
            </div>
        </div>
    );
}
