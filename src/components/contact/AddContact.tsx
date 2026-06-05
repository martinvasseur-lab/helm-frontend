import { useState } from "react";
import FormCard, { formStyles as styles } from "../Card";

interface Contact {
    name: string;
    email: string;
    subject: string;
    content: string;
}

export default function AddContact() {
    const [form, setForm] = useState<Contact>({ name: "", email: "", subject: "", content: "" });

    const handleChange = (e: React.ChangeEvent<HTMLElement & { name: string; value: string }>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await fetch("http://localhost:5004/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
    };

    return (
        <FormCard title="Contact" onSubmit={handleSubmit} submitLabel="Send">
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input name="name" type="text" placeholder="Tom" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input name="email" type="email" placeholder="tom@example.com" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Subject</label>
                <input name="subject" type="text" placeholder="Avis client" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Content</label>
                <textarea name="content" placeholder="Nice work, keep it up!" className={styles.input} onChange={handleChange} />
            </div>
        </FormCard>
    );
}
