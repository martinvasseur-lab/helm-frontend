import { useEffect, useState } from "react";
import styles from "../styles/Backoffice.module.css";

interface Label {
    id: number;
    name: string;
    category_id: number
    category_name: number
}

export default function LabelList() {
    const [labels, setLabels] = useState<Label[]>([]);
    const token = "admin-token";

    useEffect(() => {
        fetch("http://localhost:5002/label")
            .then((r) => r.json())
            .then(setLabels);
    }, []);

    const deleteLabel = async (id: number) => {
        await fetch(`http://localhost:5002/label/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setLabels((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className={styles.contentTitle} style={{ margin: 0 }}>Labels</h2>
                <a href="/backoffice/label/create" className={styles.btnSecondary}>+ New Label</a>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th><strong>Id</strong></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {labels.map((l) => (
                        <tr key={l.id}>
                            <td><strong>{l.id}</strong></td>
                            <td>{l.name}</td>
                            <td>{l.category_name}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.btnDelete} onClick={() => deleteLabel(l.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}