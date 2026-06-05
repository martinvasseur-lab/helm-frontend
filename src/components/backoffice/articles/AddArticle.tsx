import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormCard, { formStyles as styles } from "../../Card";

interface Label { id: number; name: string; }

export default function AddArticle() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", content: "", image_url: "" });
    const [availableLabels, setAvailableLabels] = useState<Label[]>([]);
    const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);

    useEffect(() => {
        fetch("http://localhost:5002/label")
            .then(r => r.json())
            .then(setAvailableLabels)
            .catch(() => {});
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLElement & { name: string; value: string }>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const addLabel = (id: number) => {
        const label = availableLabels.find(l => l.id === id);
        if (label && !selectedLabels.find(l => l.id === id)) {
            setSelectedLabels(prev => [...prev, label]);
        }
    };

    const removeLabel = (id: number) => {
        setSelectedLabels(prev => prev.filter(l => l.id !== id));
    };

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:5002/article", {
            method: "POST",
            headers: { Authorization: "Bearer admin-token", "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, label_ids: selectedLabels.map(l => l.id) }),
        });
        if (res.ok) navigate("/backoffice");
    };

    const unselected = availableLabels.filter(l => !selectedLabels.find(s => s.id === l.id));

    return (
        <FormCard title="New article" onSubmit={handleSubmit} submitLabel="Create">
            <div className={styles.field}>
                <label className={styles.label}>Title</label>
                <input name="title" type="text" placeholder="Bangkok" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Content</label>
                <textarea name="content" placeholder="Craziest city on earth" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Image URL</label>
                <input name="image_url" type="url" placeholder="https://example.com/image.jpg" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Labels</label>
                <div className={styles.tagRow}>
                    <select
                        className={styles.input}
                        value=""
                        onChange={e => addLabel(Number(e.target.value))}
                    >
                        <option value="">— Add a label —</option>
                        {unselected.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                </div>
                {selectedLabels.length > 0 && (
                    <div className={styles.tags}>
                        {selectedLabels.map(l => (
                            <span key={l.id} className={styles.tag}>
                                {l.name}
                                <button className={styles.tagRemove} onClick={() => removeLabel(l.id)}>×</button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </FormCard>
    );
}
