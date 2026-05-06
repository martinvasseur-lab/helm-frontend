import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard, { formStyles as styles } from "../../FormCard";

interface FormData {
    name: string;
    price: number;
    description: string;
    categories: string[];
}

export default function AddProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormData>({ name: "", price: 0, description: "", categories: [] });
    const [categoryInput, setCategoryInput] = useState("");

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
        const res = await fetch("http://localhost:5003/product/create", {
            method: "POST",
            headers: { Authorization: "Bearer admin-token", "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (res.ok) navigate("/backoffice");
    };

    return (
        <FormCard title="New product" onSubmit={handleSubmit} submitLabel="Create">
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input name="name" type="text" placeholder="Travel Bag" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Price</label>
                <input name="price" type="number" placeholder="10" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Description</label>
                <input name="description" type="text" placeholder="Light bag" className={styles.input} onChange={handleChange} />
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