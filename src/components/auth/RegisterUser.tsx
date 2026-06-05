import { useState } from "react";
import FormCard, { formStyles as styles } from "../Card";

interface FormData {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export default function RegisterUser() {
    const [form, setForm] = useState<FormData>({ username: "", password: "", first_name: "", last_name: "", email: "", phone: "" });

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
                <label className={styles.label}>Username</label>
                <input name="username" type="text" placeholder="Jane01" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input name="password" type="password" placeholder="Password" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>First name</label>
                <input name="first_name" type="text" placeholder="Jane" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Last name</label>
                <input name="last_name" type="text" placeholder="Kelly" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input name="email" type="email" placeholder="jane@example.com" className={styles.input} onChange={handleChange} required/>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Phone</label>
                <input name="phone" type="text" placeholder="06XXXXXXXX" className={styles.input} onChange={handleChange} />
            </div>
        </FormCard>
    );
}
