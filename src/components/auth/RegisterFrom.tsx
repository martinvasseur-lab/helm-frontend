import { useState } from "react";
import FormCard, { formStyles as styles } from "../FormCard";

interface FormData {
    name: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    const [form, setForm] = useState<FormData>({ name: "", email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLElement & { name: string; value: string }>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await fetch("http://localhost:5001/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
    };

    return (
        <FormCard
            title="Register"
            onSubmit={handleSubmit}
            submitLabel="Register"
            footer={<>Already have an account? <a href="/login" className={styles.footerLink}>Login</a></>}
        >
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input name="name" type="text" placeholder="Jane Smith" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input name="email" type="email" placeholder="jane@example.com" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input name="password" type="password" placeholder="Password" className={styles.input} onChange={handleChange} />
            </div>
        </FormCard>
    );
}
