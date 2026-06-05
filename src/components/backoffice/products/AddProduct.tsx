import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormCard, { formStyles as styles } from "../../Card";

interface Category { id: number; name: string; }

export default function AddProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", price: 0, description: "", image_url: "", stock: 0 });
    const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("http://localhost:5003/filter")
            .then(r => r.json())
            .then(setAvailableCategories)
            .catch(() => {});
    }, []);

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
        const res = await fetch("http://localhost:5003/product", {
            method: "POST",
            headers: { Authorization: "Bearer admin-token", "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, category_ids: selectedCategories.map(c => c.id) }),
        });
        if (res.ok) navigate("/backoffice");
    };

    const unselected = availableCategories.filter(c => !selectedCategories.find(s => s.id === c.id));

    return (
        <FormCard title="New product" onSubmit={handleSubmit} submitLabel="Create">
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input name="name" type="text" placeholder="Travel Bag" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Price</label>
                <input name="price" type="number" placeholder="10" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Description</label>
                <input name="description" type="text" placeholder="Light bag" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Image URL</label>
                <input name="image_url" type="text" placeholder="https://..." className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Stock</label>
                <input name="stock" type="number" placeholder="0" className={styles.input} onChange={handleChange} />
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
