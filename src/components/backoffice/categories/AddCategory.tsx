import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard, { formStyles as styles } from "../../Card";

export default function AddCategory() {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:5003/filter", {
            method: "POST",
            headers: { Authorization: "Bearer admin-token", "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        if (res.ok) navigate("/backoffice");
    };

    return (
        <FormCard title="New category" onSubmit={handleSubmit} submitLabel="Create">
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input
                    type="text"
                    placeholder="Bikepacking"
                    value={name}
                    className={styles.input}
                    onChange={e => setName(e.target.value)}
                />
            </div>
        </FormCard>
    );
}
