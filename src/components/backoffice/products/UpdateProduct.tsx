import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import FormCard, { formStyles as styles } from "../../Card";

interface Category { id: number; name: string; }

export default function UpdateProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const productId = Number(id);

    const [form, setForm] = useState({ name: "", price: "", description: "", image_url: "", stock: "" });
    const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:5003/product/${productId}`).then(r => r.json()),
            fetch("http://localhost:5003/filter").then(r => r.json()),
        ]).then(([product, categories]) => {
            setForm({ name: product.name, price: String(product.price), description: product.description ?? "", image_url: product.image_url ?? "", stock: String(product.stock ?? 0) });
            setSelectedCategories(product.categories ?? []);
            setAvailableCategories(categories);
        }).catch(() => {});
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLElement & { name: string; value: string }>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const addCategory = (id: number) => {
        const cat = availableCategories.find(c => c.id === id);
        if (cat && !selectedCategories.find(c => c.id === id)) {
            setSelectedCategories(prev => [...prev, cat]);
        }
    };

    const removeCategory = (id: number) => {
        setSelectedCategories(prev => prev.filter(c => c.id !== id));
    };

    const handleSubmit = async () => {
        const res = await fetch(`http://localhost:5003/product/${productId}`, {
            method: "PATCH",
            headers: { Authorization: "Bearer admin-token", "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock), category_ids: selectedCategories.map(c => c.id) }),
        });
        if (res.ok) navigate("/backoffice");
    };

    const unselected = availableCategories.filter(c => !selectedCategories.find(s => s.id === c.id));

    return (
        <FormCard title="Update product" onSubmit={handleSubmit} submitLabel="Update">
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input name="name" type="text" value={form.name} className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Price</label>
                <input name="price" type="number" value={form.price} className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Description</label>
                <input name="description" type="text" value={form.description} className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Image URL</label>
                <input name="image_url" type="text" value={form.image_url} className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Stock</label>
                <input name="stock" type="number" value={form.stock} className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Categories</label>
                <div className={styles.tagRow}>
                    <select
                        className={styles.input}
                        value=""
                        onChange={e => addCategory(Number(e.target.value))}
                    >
                        <option value="">— Add a category —</option>
                        {unselected.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                {selectedCategories.length > 0 && (
                    <div className={styles.tags}>
                        {selectedCategories.map(c => (
                            <span key={c.id} className={styles.tag}>
                                {c.name}
                                <button className={styles.tagRemove} onClick={() => removeCategory(c.id)}>×</button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </FormCard>
    );
}
