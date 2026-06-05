import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewUser.module.css";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    created_at: string;
    updated_at: string;
}

const roleClass: Record<string, string> = {
    superadmin: styles.badgeSuper,
    admin: styles.badgeAdmin,
    user: styles.badgeUser,
};

export default function ViewUser() {
    const { id } = useParams();
    const userId = Number(id);

    const [user, setUser] = useState<User | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        fetch(`http://localhost:5001/admin/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then(setUser);
    }, [userId]);

    if (!user) return <p>Loading...</p>;

    const initials = (user.first_name?.[0] ?? user.username[0]).toUpperCase();

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.name}>
                        {user.first_name && user.last_name
                            ? `${user.first_name} ${user.last_name}`
                            : user.username}
                    </h2>
                </div>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <span className={styles.label}>ID</span>
                        <span className={styles.value}>{user.id}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Username</span>
                        <span className={styles.value}>{user.username}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>First name</span>
                        <span className={styles.value}>{user.first_name ?? "—"}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Last name</span>
                        <span className={styles.value}>{user.last_name ?? "—"}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{user.email}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Phone</span>
                        <span className={styles.value}>{user.phone ?? "—"}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Member since</span>
                        <span className={styles.value}>{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>Last updated</span>
                        <span className={styles.value}>{new Date(user.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
