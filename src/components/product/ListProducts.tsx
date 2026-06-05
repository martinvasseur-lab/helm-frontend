import { useEffect, useState } from "react";
import ProductCard from "./CardProduct";
import styles from "./ListProducts.module.css";

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

export default function ListProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5003/product")
            .then((res) => res.json())
            .then(setProducts);
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        categories={product.categories}
                        image={product.image_url}
                    />
                ))}
            </div>
        </div>
    );
}
