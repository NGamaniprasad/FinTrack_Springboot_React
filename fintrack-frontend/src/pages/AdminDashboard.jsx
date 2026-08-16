



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAdminDashboard,
    getContactMessages,
    markContactMessageAsRead,
    deleteContactMessage
} from "../services/api";

import "./AdminDashboard.css";


const AdminDashboard = () => {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);

    const [contactMessages, setContactMessages] = useState([]);

    const [loading, setLoading] = useState(true);

    const [messageLoading, setMessageLoading] = useState(true);

    const [error, setError] = useState("");

    const [messageError, setMessageError] = useState("");


    /* =========================================================
       LOAD ADMIN DASHBOARD + CONTACT MESSAGES
    ========================================================= */

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


        /* -----------------------------------------------------
           ADMIN LOGIN CHECK
        ----------------------------------------------------- */

        if (!token || role !== "ADMIN") {

            navigate("/admin/login", {
                replace: true
            });

            return;
        }


        /* -----------------------------------------------------
           LOAD DASHBOARD
        ----------------------------------------------------- */

        const loadDashboard = async () => {

            try {

                const data =
                    await getAdminDashboard();

                console.log(
                    "ADMIN DASHBOARD:",
                    data
                );

                setDashboard(data);

            } catch (err) {

                console.error(
                    "ADMIN DASHBOARD ERROR:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load admin dashboard."
                );

            } finally {

                setLoading(false);
            }
        };


        /* -----------------------------------------------------
           LOAD CUSTOMER CONTACT MESSAGES
        ----------------------------------------------------- */

        const loadContactMessages = async () => {

            try {

                setMessageLoading(true);

                setMessageError("");

                const data =
                    await getContactMessages();

                console.log(
                    "CONTACT MESSAGES:",
                    data
                );

                setContactMessages(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (err) {

                console.error(
                    "CONTACT MESSAGE ERROR:",
                    err
                );

                setMessageError(
                    err.message ||
                    "Unable to load customer messages."
                );

            } finally {

                setMessageLoading(false);
            }
        };


        loadDashboard();

        loadContactMessages();

    }, [navigate]);


    /* =========================================================
       MARK CONTACT MESSAGE AS READ
    ========================================================= */

    const handleMarkAsRead = async (id) => {

        try {

            await markContactMessageAsRead(id);

            setContactMessages(
                (previousMessages) =>
                    previousMessages.map(
                        (contactMessage) =>
                            contactMessage.id === id
                                ? {
                                    ...contactMessage,
                                    status: "READ"
                                }
                                : contactMessage
                    )
            );

        } catch (err) {

            console.error(
                "MARK MESSAGE READ ERROR:",
                err
            );

            alert(
                err.message ||
                "Unable to mark message as read."
            );
        }
    };


    /* =========================================================
       DELETE CONTACT MESSAGE
    ========================================================= */

    const handleDeleteMessage = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this customer message?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await deleteContactMessage(id);

            setContactMessages(
                (previousMessages) =>
                    previousMessages.filter(
                        (contactMessage) =>
                            contactMessage.id !== id
                    )
            );

        } catch (err) {

            console.error(
                "DELETE CONTACT MESSAGE ERROR:",
                err
            );

            alert(
                err.message ||
                "Unable to delete contact message."
            );
        }
    };


    /* =========================================================
       FORMAT DATE
    ========================================================= */

    const formatDate = (dateValue) => {

        if (!dateValue) {
            return "—";
        }

        try {

            return new Date(
                dateValue
            ).toLocaleString(
                "en-IN",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            );

        } catch {

            return dateValue;
        }
    };


    /* =========================================================
       NEW MESSAGE COUNT
    ========================================================= */

    const newMessageCount =
        contactMessages.filter(
            (contactMessage) =>
                (
                    contactMessage.status || ""
                ).toUpperCase() === "NEW"
        ).length;


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (
            <main className="admin-dashboard-page">

                <div className="admin-dashboard-container">

                    <div className="admin-loading-card">

                        <div className="admin-loading-spinner"></div>

                        <h2>
                            Loading Admin Dashboard
                        </h2>

                        <p>
                            Please wait while we load your
                            administration data.
                        </p>

                    </div>

                </div>

            </main>
        );
    }


    /* =========================================================
       DASHBOARD ERROR
    ========================================================= */

    if (error) {

        return (
            <main className="admin-dashboard-page">

                <div className="admin-dashboard-container">

                    <div className="admin-error">

                        <span className="admin-error-icon">
                            !
                        </span>

                        <div>

                            <h3>
                                Unable to load dashboard
                            </h3>

                            <p>
                                {error}
                            </p>

                        </div>

                    </div>

                </div>

            </main>
        );
    }


    /* =========================================================
       ADMIN DASHBOARD
    ========================================================= */

    return (

        <main className="admin-dashboard-page">

            <div className="admin-dashboard-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="admin-dashboard-header">

                    <div className="admin-header-content">

                        <span className="admin-label">
                            FINTRACK ADMIN
                        </span>

                        <h1>
                            Admin Dashboard
                        </h1>

                        <p>
                            Welcome back,{" "}
                            <strong>
                                {
                                    localStorage.getItem(
                                        "fullName"
                                    ) || "Admin"
                                }
                            </strong>
                            . Here's an overview of your platform.
                        </p>

                    </div>


                    <div className="admin-header-badge">

                        <span className="admin-status-dot"></span>

                        Administrator

                    </div>

                </section>


                {/* =================================================
                    PLATFORM OVERVIEW
                ================================================= */}

                <section className="admin-overview-section">

                    <div className="admin-section-heading">

                        <div>

                            <span>
                                OVERVIEW
                            </span>

                            <h2>
                                Platform Statistics
                            </h2>

                        </div>

                        <p>
                            Current FinTrack system activity
                        </p>

                    </div>


                    <div className="admin-stat-grid">


                        {/* TOTAL USERS */}

                        <div className="admin-stat-card">

                            <div className="admin-stat-icon users-icon">
                                U
                            </div>

                            <div className="admin-stat-content">

                                <span>
                                    Total Users
                                </span>

                                <strong>
                                    {dashboard?.totalUsers ?? 0}
                                </strong>

                                <small>
                                    Registered accounts
                                </small>

                            </div>

                        </div>


                        {/* ACTIVE USERS */}

                        <div className="admin-stat-card">

                            <div className="admin-stat-icon active-icon">
                                ✓
                            </div>

                            <div className="admin-stat-content">

                                <span>
                                    Active Users
                                </span>

                                <strong>
                                    {dashboard?.activeUsers ?? 0}
                                </strong>

                                <small>
                                    Currently active
                                </small>

                            </div>

                        </div>


                        {/* INACTIVE USERS */}

                        <div className="admin-stat-card">

                            <div className="admin-stat-icon inactive-icon">
                                !
                            </div>

                            <div className="admin-stat-content">

                                <span>
                                    Inactive Users
                                </span>

                                <strong>
                                    {dashboard?.inactiveUsers ?? 0}
                                </strong>

                                <small>
                                    Inactive accounts
                                </small>

                            </div>

                        </div>


                        {/* INCOME */}

                        <div className="admin-stat-card">

                            <div className="admin-stat-icon income-icon">
                                ↑
                            </div>

                            <div className="admin-stat-content">

                                <span>
                                    Income Records
                                </span>

                                <strong>
                                    {dashboard?.totalIncomes ?? 0}
                                </strong>

                                <small>
                                    Income entries
                                </small>

                            </div>

                        </div>


                        {/* EXPENSE */}

                        <div className="admin-stat-card">

                            <div className="admin-stat-icon expense-icon">
                                ↓
                            </div>

                            <div className="admin-stat-content">

                                <span>
                                    Expense Records
                                </span>

                                <strong>
                                    {dashboard?.totalExpenses ?? 0}
                                </strong>

                                <small>
                                    Expense entries
                                </small>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ADMIN MANAGEMENT
                ================================================= */}

                <section className="admin-management">

                    <div className="admin-section-heading">

                        <div>

                            <span>
                                MANAGEMENT
                            </span>

                            <h2>
                                Manage FinTrack
                            </h2>

                        </div>

                        <p>
                            Administration tools and controls
                        </p>

                    </div>


                    <div className="admin-management-grid">


                        {/* USER MANAGEMENT */}

                        <button
                            type="button"
                            className="admin-management-card"
                            onClick={() =>
                                navigate("/admin/users")
                            }
                        >

                            <div className="management-icon">
                                U
                            </div>

                            <div className="management-content">

                                <h3>
                                    User Management
                                </h3>

                                <p>
                                    View users and manage their
                                    account status.
                                </p>

                                <span className="management-link">
                                    Manage Users →
                                </span>

                            </div>

                        </button>


                        {/* CONTACT MESSAGES */}

                        <button
                            type="button"
                            className="admin-management-card"
                            onClick={() =>
                                document
                                    .getElementById(
                                        "admin-contact-messages"
                                    )
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >

                            <div className="management-icon">
                                ✉
                            </div>

                            <div className="management-content">

                                <h3>
                                    Contact Messages
                                </h3>

                                <p>
                                    View messages and feedback
                                    received from customers.
                                </p>

                                <span className="management-link">
                                    View Messages →
                                </span>

                            </div>

                        </button>


                        {/* UPDATE PROFILE */}

                        <button
                            type="button"
                            className="admin-management-card"
                            onClick={() =>
                                navigate("/admin/profile")
                            }
                        >

                            <div className="management-icon">
                                P
                            </div>

                            <div className="management-content">

                                <h3>
                                    Update Profile
                                </h3>

                                <p>
                                    Update your administrator
                                    profile and password.
                                </p>

                                <span className="management-link">
                                    Update Profile →
                                </span>

                            </div>

                        </button>

                    </div>

                </section>


                {/* =================================================
                    CUSTOMER CONTACT MESSAGES
                ================================================= */}

                <section
                    id="admin-contact-messages"
                    className="admin-contact-section"
                >

                    <div className="admin-section-heading">

                        <div>

                            <span>
                                CUSTOMER SUPPORT
                            </span>

                            <h2>
                                Contact Messages
                            </h2>

                        </div>

                        <p>
                            Messages received from the FinTrack
                            contact page
                        </p>

                    </div>


                    {/* MESSAGE SUMMARY */}

                    <div className="admin-message-summary">

                        <div className="admin-message-count">

                            <strong>
                                {contactMessages.length}
                            </strong>

                            <span>
                                Total Messages
                            </span>

                        </div>


                        <div className="admin-message-count new">

                            <strong>
                                {newMessageCount}
                            </strong>

                            <span>
                                New Messages
                            </span>

                        </div>

                    </div>


                    {/* MESSAGE ERROR */}

                    {messageError && (

                        <div className="admin-error">

                            <span className="admin-error-icon">
                                !
                            </span>

                            <div>

                                <h3>
                                    Unable to load messages
                                </h3>

                                <p>
                                    {messageError}
                                </p>

                            </div>

                        </div>
                    )}


                    {/* MESSAGE LOADING */}

                    {messageLoading && (

                        <div className="admin-loading-card">

                            <div className="admin-loading-spinner"></div>

                            <h3>
                                Loading Customer Messages
                            </h3>

                        </div>
                    )}


                    {/* NO MESSAGES */}

                    {!messageLoading &&
                        !messageError &&
                        contactMessages.length === 0 && (

                            <div className="admin-empty-messages">

                                <div className="admin-empty-icon">
                                    ✉
                                </div>

                                <h3>
                                    No customer messages
                                </h3>

                                <p>
                                    Messages submitted through
                                    the Contact Us page will appear
                                    here.
                                </p>

                            </div>
                        )}


                    {/* MESSAGE LIST */}

                    {!messageLoading &&
                        !messageError &&
                        contactMessages.length > 0 && (

                            <div className="admin-contact-list">

                                {contactMessages.map(
                                    (contactMessage) => (

                                        <article
                                            key={
                                                contactMessage.id
                                            }
                                            className={
                                                `admin-contact-card ${
                                                    (
                                                        contactMessage.status ||
                                                        ""
                                                    ).toUpperCase() === "NEW"
                                                        ? "is-new"
                                                        : ""
                                                }`
                                            }
                                        >

                                            {/* MESSAGE HEADER */}

                                            <div className="admin-contact-header">

                                                <div>

                                                    <h3>
                                                        {
                                                            contactMessage.name ||
                                                            "Unknown Customer"
                                                        }
                                                    </h3>

                                                    <p>
                                                        {
                                                            contactMessage.email ||
                                                            "No email"
                                                        }
                                                    </p>

                                                </div>


                                                <span
                                                    className={
                                                        `admin-contact-status ${
                                                            (
                                                                contactMessage.status ||
                                                                ""
                                                            ).toUpperCase() === "NEW"
                                                                ? "new"
                                                                : "read"
                                                        }`
                                                    }
                                                >
                                                    {
                                                        (
                                                            contactMessage.status ||
                                                            "NEW"
                                                        ).toUpperCase()
                                                    }
                                                </span>

                                            </div>


                                            {/* MESSAGE */}

                                            <div className="admin-contact-message">

                                                <strong>
                                                    Message
                                                </strong>

                                                <p>
                                                    {
                                                        contactMessage.message ||
                                                        "No message content."
                                                    }
                                                </p>

                                            </div>


                                            {/* DATE */}

                                            <div className="admin-contact-date">

                                                <span>
                                                    Received:
                                                </span>

                                                <strong>
                                                    {
                                                        formatDate(
                                                            contactMessage.createdAt
                                                        )
                                                    }
                                                </strong>

                                            </div>


                                            {/* ACTIONS */}

                                            <div className="admin-contact-actions">


                                                {/* MARK READ */}

                                                {
                                                    (
                                                        contactMessage.status ||
                                                        ""
                                                    ).toUpperCase() ===
                                                        "NEW" && (

                                                        <button
                                                            type="button"
                                                            className="admin-message-read-button"
                                                            onClick={() =>
                                                                handleMarkAsRead(
                                                                    contactMessage.id
                                                                )
                                                            }
                                                        >
                                                            ✓ Mark as Read
                                                        </button>
                                                    )
                                                }


                                                {/* DELETE */}

                                                <button
                                                    type="button"
                                                    className="admin-message-delete-button"
                                                    onClick={() =>
                                                        handleDeleteMessage(
                                                            contactMessage.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </article>
                                    )
                                )}

                            </div>
                        )}

                </section>

            </div>

        </main>
    );
};


export default AdminDashboard;

