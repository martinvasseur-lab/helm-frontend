import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewProduct.module.css";

interface Category { id: number; name: string; }

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    categories: Category[];
    image_url?: string;
}

export default function ViewProduct() {
    const { id } = useParams();
    const productId = Number(id);

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
                {product.image_url
                    ? <img src={product.image_url} alt={product.name} className={styles.image} />
                    : <div className={styles.imagePlaceholder} />
                }
                <div className={styles.body}>
                    <h1 className={styles.name}>{product.name}</h1>
                    <p className={styles.price}>{product.price} €</p>
                    {product.categories.length > 0 && (
                        <div className={styles.categories}>
                            {product.categories.map((c) => <span key={c.id} className={styles.category}>{c.name}</span>)}
                        </div>
                    )}
                    <p className={styles.description}>{product.description}</p>
                </div>
            </div>
        </div>
    );
}
