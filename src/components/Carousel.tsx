import { useState } from "react";
import styles from "./styles/Carousel.module.css";

const CARD_WIDTH = 280;
const CARD_GAP = 24;
const VISIBLE = 3;

interface CarouselProps {
    items: { id: number }[];
    renderItem: (item: any) => React.ReactNode;
}

export default function Carousel({ items, renderItem }: CarouselProps) {
    const [index, setIndex] = useState(0);
    const max = Math.max(0, items.length - VISIBLE);
    const step = CARD_WIDTH + CARD_GAP;

    return (
        <div className={styles.carousel}>
            <button className={styles.btn} onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0}>&#8249;</button>
            <div className={styles.viewport}>
                <div className={styles.track} style={{ transform: `translateX(-${index * step}px)` }}>
                    {items.map(item => (
                        <div key={item.id} className={styles.item}>
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>
            <button className={styles.btn} onClick={() => setIndex(i => Math.min(max, i + 1))} disabled={index >= max}>&#8250;</button>
        </div>
    );
}
