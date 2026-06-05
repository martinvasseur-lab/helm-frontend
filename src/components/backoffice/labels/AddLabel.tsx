import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormCard, { formStyles as styles } from "../../Card";

interface Category {
    id: number;
    name: string;
}

export default function AddLabel() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState<number | "">("");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("http://localhost:5002/label/category")
            .then(r => r.json())
            .then(setCategories)
            .catch(() => {});
    }, []);

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:5002/label", {
            method: "POST",
            headers: { Authorization: "Bearer admin-token", "Content-Type": "application/json" },
            body: JSON.stringify({ name, category_id: categoryId }),
        });
        if (res.ok) navigate("/backoffice");
    };

    return (
        <FormCard title="New label" onSubmit={handleSubmit} submitLabel="Create">
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input
                    type="text"
                    placeholder="Asia"
                    value={name}
                    className={styles.input}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Category</label>
                <select
                    value={categoryId}
                    className={styles.input}
                    onChange={e => setCategoryId(Number(e.target.value))}
                >
                    <option value="">— Select a category —</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>
        </FormCard>
    );
}
