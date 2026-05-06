import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./styles/TableProduct.module.css";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    categories: string[];
}

export default function GetProduct() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5003/product/list")
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
                        categories={product.categories}
                    />
                ))}
            </div>
        </div>
    );
}
