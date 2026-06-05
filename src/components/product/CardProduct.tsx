import styles from "./CardProduct.module.css";

interface Category { id: number; name: string; }

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    stock: number;
    categories: Category[];
    image?: string;
}

export default function ProductCard({ id, name, price, stock, categories, image }: ProductCardProps) {
    return (
        <a href={`/product/${id}`} className={styles.card}>
            {image
                ? <img src={image} alt={name} className={styles.image} />
                : <div className={styles.imagePlaceholder} />
            }
            <div className={styles.body}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.price}>{price} €</p>
                {stock === 0 && <p className={styles.stock}>Out of stock</p>}
                {categories.length > 0 && (
                    <div className={styles.categories}>
                        {categories.map((c) => <span key={c.id} className={styles.category}>{c.name}</span>)}
                    </div>
                )}
            </div>
        </a>
    );
}
