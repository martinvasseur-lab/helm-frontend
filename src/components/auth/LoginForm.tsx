import { useState } from "react";
import FormCard, { formStyles as styles } from "../FormCard";

interface FormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [form, setForm] = useState<FormData>({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLElement & { name: string; value: string }>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:5001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role ?? "user");
            window.location.href = "/";
        }
    };

    return (
        <FormCard
            title="Login"
            onSubmit={handleSubmit}
            submitLabel="Login"
            footer={<>No account? <a href="/register" className={styles.footerLink}>Register now</a></>}
        >
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
