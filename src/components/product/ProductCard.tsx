import styles from "./styles/ProductCard.module.css";

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    categories: string[];
    image?: string;
}

export default function ProductCard({ id, name, price, categories, image }: ProductCardProps) {
    return (
        <a href={`/product/${id}`} className={styles.card}>
            {image
                ? <img src={image} alt={name} className={styles.image} />
                : <div className={styles.imagePlaceholder} />
            }
            <div className={styles.body}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.price}>{price} €</p>
                {categories.length > 0 && (
                    <div className={styles.categories}>
                        {categories.map((c) => <span key={c} className={styles.category}>{c}</span>)}
                    </div>
                )}
            </div>
        </a>
    );
}
