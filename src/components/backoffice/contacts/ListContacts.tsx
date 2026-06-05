import { useEffect, useState } from "react";
import styles from "../Backoffice.module.css";

interface Contact {
    id: number;
    name: string;
    email: string
    subject: string;
    content: string;
}

export default function ListContacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const token = "admin-token";

    useEffect(() => {
        fetch("http://localhost:5004/contact",{
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then(setContacts);
    }, []);

    const deleteContact = async (id: number) => {
        await fetch(`http://localhost:5004/contact/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setContacts((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th><strong>Id</strong></th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((c) => (
                        <tr key={c.id}>
                            <td><strong>{c.id}</strong></td>
                            <td>{c.name}</td>
                            <td>{c.subject}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.btnDelete} onClick={() => deleteContact(c.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}