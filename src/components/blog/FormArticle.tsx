import { useState } from "react";
import FormCard, { formStyles as styles } from "../FormCard";

export default function FormArticle() {
    const [form, setForm] = useState({ title: "", content: "" });
    const [labels, setLabels] = useState<string[]>([]);
    const [labelInput, setLabelInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLElement & { name: string; value: string }>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const addLabel = () => {
        const trimmed = labelInput.trim();
        if (trimmed && !labels.includes(trimmed)) {
            setLabels((prev) => [...prev, trimmed]);
        }
        setLabelInput("");
    };

    const removeLabel = (label: string) => {
        setLabels((prev) => prev.filter((l) => l !== label));
    };

    const handleSubmit = async () => {
        await fetch("http://localhost:5002/article/create", {
            method: "POST",
            headers: { Authorization: "Bearer user-token", "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, labels }),
        });
    };

    return (
        <FormCard title="New article" onSubmit={handleSubmit} submitLabel="Create">
            <div className={styles.field}>
                <label className={styles.label}>Title</label>
                <input
                    name="title"
                    type="text"
                    placeholder="Perou"
                    className={styles.input}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Content</label>
                <textarea
                    name="content"
                    placeholder="Great Latino Country"
                    className={styles.input}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Labels</label>
                <div className={styles.tagRow}>
                    <input
                        type="text"
                        placeholder="South America"
                        value={labelInput}
                        className={styles.input}
                        onChange={(e) => setLabelInput(e.target.value)}

                    />
                    <button type="button" className={styles.tagAddBtn} onClick={addLabel}>+</button>
                </div>
                {labels.length > 0 && (
                    <div className={styles.tags}>
                        {labels.map((l) => (
                            <span key={l} className={styles.tag}>
                                {l}
                                <button className={styles.tagRemove} onClick={() => removeLabel(l)}>×</button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </FormCard>
    );
}
