import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard, { formStyles as styles } from "../../FormCard";

interface FormData {
    name: string;
    price: string;
    description: string;
    categories: string[];
}

export default function UpdateProduct({ productId }: { productId: number }) {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormData>({ name: "", price: "", description: "", categories: [] });
    const [categoryInput, setCategoryInput] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5003/product/${productId}`)
            .then((res) => res.json())
            .then((data) => setForm({
                name: data.name,
                price: String(data.price),
                description: data.description,
                categories: data.categories,
            }));
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLElement & { name: string; value: string }>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const addCategory = () => {
        const trimmed = categoryInput.trim();
        if (trimmed && !form.categories.includes(trimmed)) {
            setForm((prev) => ({ ...prev, categories: [...prev.categories, trimmed] }));
        }
        setCategoryInput("");
    };

    const removeCategory = (cat: string) => {
        setForm((prev) => ({ ...prev, categories: prev.categories.filter((c) => c !== cat) }));
    };

    const handleSubmit = async () => {
        const token = "admin-token";
        const res = await fetch(`http://localhost:5003/product/${productId}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, price: Number(form.price) }),
        });
        if (res.ok) navigate("/backoffice");
    };

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
                <label className={styles.label}>Categories</label>
                <div className={styles.tagRow}>
                    <input
                        type="text"
                        placeholder="asia"
                        value={categoryInput}
                        className={styles.input}
                        onChange={(e) => setCategoryInput(e.target.value)}
                    />
                    <button type="button" className={styles.tagAddBtn} onClick={addCategory}>+</button>
                </div>
                {form.categories.length > 0 && (
                    <div className={styles.tags}>
                        {form.categories.map((c) => (
                            <span key={c} className={styles.tag}>
                                {c}
                                <button className={styles.tagRemove} onClick={() => removeCategory(c)}>×</button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </FormCard>
    );
}
