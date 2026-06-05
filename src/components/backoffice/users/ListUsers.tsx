import { useEffect, useState } from "react";
import styles from "../Backoffice.module.css";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

const roleClass: Record<string, string> = {
    superadmin: styles.badgeSuper,
    admin: styles.badgeAdmin,
    user: styles.badgeUser,
};

export default function ListUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const token = localStorage.getItem("token");
    const currentRole = localStorage.getItem("role");

    useEffect(() => {
        fetch("http://localhost:5001/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then(setUsers);
    }, []);

    const deleteUser = async (id: number) => {
        await fetch(`http://localhost:5001/admin/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const setRole = async (id: number, role: "admin" | "user") => {
        await fetch(`http://localhost:5001/admin/users/${id}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ role }),
        });
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
    };

    return (
        <>
            <h2 className={styles.contentTitle}>Users</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td><span className={`${styles.badge} ${roleClass[u.role] ?? styles.badgeUser}`}>{u.role}</span></td>
                            <td>
                                <div className={styles.actions}>
                                    <a href={`/backoffice/user/${u.id}`} className={styles.btnSecondary}>View</a>
                                    {u.role !== "superadmin" && currentRole === "superadmin" && u.role === "user"  && <button className={styles.btnSecondary} onClick={() => setRole(u.id, "admin")}>Promote</button>}
                                    {u.role !== "superadmin" && currentRole === "superadmin" && u.role === "admin" && <button className={styles.btnSecondary} onClick={() => setRole(u.id, "user")}>Demote</button>}
                                    {u.role === "user" && <button className={styles.btnDelete} onClick={() => deleteUser(u.id)}>Delete</button>}
                                    {u.role === "admin" && currentRole === "superadmin" && <button className={styles.btnDelete} onClick={() => deleteUser(u.id)}>Delete</button>}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
