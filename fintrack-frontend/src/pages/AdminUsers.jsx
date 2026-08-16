
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAdminUsers,
    updateAdminUser,
    activateAdminUser,
    deactivateAdminUser,
    deleteAdminUser
} from "../services/api";

import "./AdminUsers.css";


const AdminUsers = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [editingUser, setEditingUser] =
        useState(null);

    const [editName, setEditName] =
        useState("");

    const [editEmail, setEditEmail] =
        useState("");

    const [saving, setSaving] =
        useState(false);


    /* =================================================
       CHECK ADMIN
    ================================================= */

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        const role =
            (
                localStorage.getItem("role") || ""
            )
                .trim()
                .toUpperCase()
                .replace("ROLE_", "");


        if (!token || role !== "ADMIN") {

            navigate(
                "/admin/login",
                {
                    replace: true
                }
            );

            return;
        }


        loadUsers();

    }, [navigate]);


    /* =================================================
       LOAD USERS
    ================================================= */

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAdminUsers();

            console.log(
                "ADMIN USERS:",
                data
            );


            /*
             * Backend may return either:
             *
             * [
             *   {...},
             *   {...}
             * ]
             *
             * OR
             *
             * {
             *   users: [...]
             * }
             */

            if (Array.isArray(data)) {

                setUsers(data);

            } else if (
                Array.isArray(data?.users)
            ) {

                setUsers(data.users);

            } else {

                setUsers([]);
            }

        } catch (err) {

            console.error(
                "GET ADMIN USERS ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to load users"
            );

        } finally {

            setLoading(false);
        }
    };


    /* =================================================
       SEARCH
    ================================================= */

    const filteredUsers =
        users.filter((user) => {

            const name =
                String(
                    user.fullName || ""
                ).toLowerCase();

            const email =
                String(
                    user.email || ""
                ).toLowerCase();

            const searchValue =
                search.toLowerCase();

            return (
                name.includes(searchValue) ||
                email.includes(searchValue)
            );
        });


    /* =================================================
       EDIT
    ================================================= */

    const handleEdit = (user) => {

        setEditingUser(user);

        setEditName(
            user.fullName || ""
        );

        setEditEmail(
            user.email || ""
        );
    };


    /* =================================================
       CANCEL EDIT
    ================================================= */

    const handleCancelEdit = () => {

        setEditingUser(null);

        setEditName("");

        setEditEmail("");
    };


    /* =================================================
       SAVE EDIT
    ================================================= */

    const handleSaveEdit = async () => {

        if (!editingUser) {
            return;
        }


        if (!editName.trim()) {

            alert(
                "Full name is required."
            );

            return;
        }


        if (!editEmail.trim()) {

            alert(
                "Email is required."
            );

            return;
        }


        try {

            setSaving(true);


            await updateAdminUser(
                editingUser.id,
                {
                    fullName:
                        editName.trim(),

                    email:
                        editEmail.trim()
                }
            );


            alert(
                "User updated successfully."
            );


            setEditingUser(null);

            setEditName("");

            setEditEmail("");


            await loadUsers();

        } catch (err) {

            console.error(
                "UPDATE USER ERROR:",
                err
            );

            alert(
                err.message ||
                "Unable to update user."
            );

        } finally {

            setSaving(false);
        }
    };


    /* =================================================
       ACTIVATE
    ================================================= */

    const handleActivate = async (user) => {

        const confirmed =
            window.confirm(
                `Activate ${user.fullName}?`
            );


        if (!confirmed) {
            return;
        }


        try {

            await activateAdminUser(
                user.id
            );


            await loadUsers();

        } catch (err) {

            console.error(
                "ACTIVATE USER ERROR:",
                err
            );

            alert(
                err.message ||
                "Unable to activate user."
            );
        }
    };


    /* =================================================
       DEACTIVATE
    ================================================= */

    const handleDeactivate = async (user) => {

        const confirmed =
            window.confirm(
                `Deactivate ${user.fullName}?`
            );


        if (!confirmed) {
            return;
        }


        try {

            await deactivateAdminUser(
                user.id
            );


            await loadUsers();

        } catch (err) {

            console.error(
                "DEACTIVATE USER ERROR:",
                err
            );

            alert(
                err.message ||
                "Unable to deactivate user."
            );
        }
    };


    /* =================================================
       DELETE
    ================================================= */

    const handleDelete = async (user) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to permanently delete ${user.fullName}?`
            );


        if (!confirmed) {
            return;
        }


        try {

            await deleteAdminUser(
                user.id
            );


            alert(
                "User deleted successfully."
            );


            await loadUsers();

        } catch (err) {

            console.error(
                "DELETE USER ERROR:",
                err
            );

            alert(
                err.message ||
                "Unable to delete user."
            );
        }
    };


    /* =================================================
       LOADING
    ================================================= */

    if (loading) {

        return (

            <main className="admin-users-page">

                <div className="admin-users-container">

                    <div className="admin-users-message">

                        Loading users...

                    </div>

                </div>

            </main>
        );
    }


    /* =================================================
       PAGE
    ================================================= */

    return (

        <main className="admin-users-page">

            <div className="admin-users-container">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="admin-users-header">

                    <div>

                        <span className="admin-users-label">
                            FINTRACK ADMIN
                        </span>

                        <h1>
                            User Management
                        </h1>

                        <p>
                            Manage registered users,
                            account status and user details.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="admin-back-button"
                        onClick={() =>
                            navigate(
                                "/admin/dashboard"
                            )
                        }
                    >
                        ← Dashboard
                    </button>

                </div>


                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div className="admin-users-error">

                        {error}

                    </div>

                )}


                {/* =====================================
                    TOOLBAR
                ===================================== */}

                <div className="admin-users-toolbar">

                    <div>

                        <strong>
                            {users.length}
                        </strong>

                        <span>
                            {" "}Total Users
                        </span>

                    </div>


                    <input
                        type="search"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="admin-users-search"
                    />

                </div>


                {/* =====================================
                    TABLE
                ===================================== */}

                <div className="admin-users-table-wrapper">

                    <table className="admin-users-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    User
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Created
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="admin-users-empty"
                                    >
                                        No users found.
                                    </td>

                                </tr>

                            ) : (

                                filteredUsers.map(
                                    (user) => (

                                        <tr
                                            key={user.id}
                                        >

                                            <td>
                                                #{user.id}
                                            </td>


                                            <td>

                                                <div className="admin-user-name">

                                                    <div className="admin-user-avatar">

                                                        {
                                                            (
                                                                user.fullName ||
                                                                "U"
                                                            )
                                                                .charAt(0)
                                                                .toUpperCase()
                                                        }

                                                    </div>

                                                    <strong>
                                                        {
                                                            user.fullName ||
                                                            "Unknown User"
                                                        }
                                                    </strong>

                                                </div>

                                            </td>


                                            <td>
                                                {user.email}
                                            </td>


                                            <td>

                                                <span className="admin-role-badge">

                                                    {
                                                        user.role ||
                                                        "USER"
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                {user.active ? (

                                                    <span className="status-badge status-active">

                                                        Active

                                                    </span>

                                                ) : (

                                                    <span className="status-badge status-inactive">

                                                        Inactive

                                                    </span>

                                                )}

                                            </td>


                                            <td>

                                                {user.createdAt
                                                    ? new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )
                                                    : "-"
                                                }

                                            </td>


                                            <td>

                                                <div className="admin-user-actions">


                                                    <button
                                                        type="button"
                                                        className="action-edit"
                                                        onClick={() =>
                                                            handleEdit(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    {user.active ? (

                                                        <button
                                                            type="button"
                                                            className="action-deactivate"
                                                            onClick={() =>
                                                                handleDeactivate(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            Deactivate
                                                        </button>

                                                    ) : (

                                                        <button
                                                            type="button"
                                                            className="action-activate"
                                                            onClick={() =>
                                                                handleActivate(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            Activate
                                                        </button>

                                                    )}


                                                    <button
                                                        type="button"
                                                        className="action-delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>


                {/* =====================================
                    EDIT MODAL
                ===================================== */}

                {editingUser && (

                    <div className="admin-edit-overlay">

                        <div className="admin-edit-modal">

                            <div className="admin-edit-header">

                                <div>

                                    <span>
                                        EDIT USER
                                    </span>

                                    <h2>
                                        Edit User
                                    </h2>

                                </div>


                                <button
                                    type="button"
                                    className="admin-modal-close"
                                    onClick={
                                        handleCancelEdit
                                    }
                                >
                                    ×
                                </button>

                            </div>


                            <div className="admin-edit-form">

                                <div className="admin-edit-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) =>
                                            setEditName(
                                                e.target.value
                                            )
                                        }
                                        disabled={saving}
                                    />

                                </div>


                                <div className="admin-edit-field">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={editEmail}
                                        onChange={(e) =>
                                            setEditEmail(
                                                e.target.value
                                            )
                                        }
                                        disabled={saving}
                                    />

                                </div>


                                <div className="admin-edit-actions">

                                    <button
                                        type="button"
                                        className="admin-cancel-button"
                                        onClick={
                                            handleCancelEdit
                                        }
                                        disabled={saving}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="button"
                                        className="admin-save-button"
                                        onClick={
                                            handleSaveEdit
                                        }
                                        disabled={saving}
                                    >
                                        {saving
                                            ? "Saving..."
                                            : "Save Changes"
                                        }
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </main>
    );
};


export default AdminUsers;

