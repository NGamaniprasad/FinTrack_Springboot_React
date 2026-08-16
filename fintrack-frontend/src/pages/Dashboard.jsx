

//////

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getDashboard,
    downloadAccountData
} from "../services/api";

import "./Dashboard.css";


const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [downloading, setDownloading] = useState("");

    const [downloadError, setDownloadError] = useState("");


    const fullName =
        localStorage.getItem("fullName") || "User";


    /* =====================================================
       LOAD DASHBOARD
    ===================================================== */

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const data =
                    await getDashboard();

                console.log(
                    "DASHBOARD DATA:",
                    data
                );

                setDashboard(data);

            } catch (err) {

                console.error(
                    "GET DASHBOARD ERROR:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load dashboard"
                );

            } finally {

                setLoading(false);
            }
        };


        loadDashboard();

    }, []);


    /* =====================================================
       DOWNLOAD ACCOUNT DATA
    ===================================================== */

    const handleDownload = async (period) => {

        try {

            setDownloading(period);

            setDownloadError("");


            await downloadAccountData(
                period
            );

        } catch (err) {

            console.error(
                "DOWNLOAD ACCOUNT DATA ERROR:",
                err
            );

            setDownloadError(
                err.message ||
                "Unable to download account data."
            );

        } finally {

            setDownloading("");
        }
    };


    /* =====================================================
       FORMAT CURRENCY
    ===================================================== */

    const formatCurrency = (value) => {

        return Number(
            value || 0
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <main className="dashboard-page">

                <div className="dashboard-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading your dashboard...
                    </p>

                </div>

            </main>
        );
    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (error) {

        return (

            <main className="dashboard-page">

                <div className="dashboard-error-box">

                    <div className="error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load dashboard
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                        className="retry-button"
                    >
                        Try Again
                    </button>

                </div>

            </main>
        );
    }


    /* =====================================================
       PAGE
    ===================================================== */

    return (

        <main className="dashboard-page">

            <div className="dashboard-container">


                {/* =================================================
                    WELCOME HEADER
                ================================================= */}

                <section className="dashboard-welcome">

                    <div>

                        <span className="dashboard-eyebrow">
                            FINTRACK • PERSONAL FINANCE
                        </span>

                        <h1>
                            Welcome back, {fullName}
                        </h1>

                        <p>
                            Here's a quick overview of your
                            financial activity.
                        </p>

                    </div>


                    <div className="welcome-badge">

                        <span className="welcome-dot"></span>

                        Account Active

                    </div>

                </section>


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                <section className="dashboard-summary-grid">


                    {/* INCOME */}

                    <div className="summary-card income-card">

                        <div className="summary-card-top">

                            <div className="summary-icon">
                                ↑
                            </div>

                            <span className="summary-trend">
                                Income
                            </span>

                        </div>


                        <span className="summary-label">
                            Total Income
                        </span>


                        <h2>
                            ₹{formatCurrency(
                                dashboard?.totalIncome
                            )}
                        </h2>


                        <p>
                            Your total recorded income
                        </p>

                    </div>


                    {/* EXPENSE */}

                    <div className="summary-card expense-card">

                        <div className="summary-card-top">

                            <div className="summary-icon">
                                ↓
                            </div>

                            <span className="summary-trend">
                                Expenses
                            </span>

                        </div>


                        <span className="summary-label">
                            Total Expenses
                        </span>


                        <h2>
                            ₹{formatCurrency(
                                dashboard?.totalExpense
                            )}
                        </h2>


                        <p>
                            Your total recorded expenses
                        </p>

                    </div>


                    {/* BALANCE */}

                    <div className="summary-card balance-card">

                        <div className="summary-card-top">

                            <div className="summary-icon">
                                ₹
                            </div>

                            <span className="summary-trend">
                                Balance
                            </span>

                        </div>


                        <span className="summary-label">
                            Current Balance
                        </span>


                        <h2>
                            ₹{formatCurrency(
                                dashboard?.balance
                            )}
                        </h2>


                        <p>
                            Income minus expenses
                        </p>

                    </div>


                    {/* BUDGET */}

                    <div className="summary-card budget-card">

                        <div className="summary-card-top">

                            <div className="summary-icon">
                                ◈
                            </div>

                            <span className="summary-trend">
                                Planning
                            </span>

                        </div>


                        <span className="summary-label">
                            Total Budget
                        </span>


                        <h2>
                            ₹{formatCurrency(
                                dashboard?.totalBudget
                            )}
                        </h2>


                        <p>
                            Your planned spending amount
                        </p>

                    </div>

                </section>


                {/* =================================================
                    FINANCIAL MANAGEMENT
                ================================================= */}

                <section className="dashboard-management">

                    <div className="section-heading">

                        <div>

                            <span>
                                MANAGE YOUR MONEY
                            </span>

                            <h2>
                                Financial Management
                            </h2>

                        </div>


                        <p>
                            Keep your finances organized
                            from one place.
                        </p>

                    </div>


                    <div className="dashboard-action-grid">


                        {/* INCOME */}

                        <Link
                            to="/income"
                            className="dashboard-action-card"
                        >

                            <div className="action-icon income-icon">
                                ↑
                            </div>


                            <div className="action-content">

                                <h3>
                                    Income
                                </h3>

                                <p>
                                    Add and manage your
                                    income records.
                                </p>

                            </div>


                            <span className="action-arrow">
                                →
                            </span>

                        </Link>


                        {/* EXPENSES */}

                        <Link
                            to="/expenses"
                            className="dashboard-action-card"
                        >

                            <div className="action-icon expense-icon">
                                ↓
                            </div>


                            <div className="action-content">

                                <h3>
                                    Expenses
                                </h3>

                                <p>
                                    Track where your money
                                    is being spent.
                                </p>

                            </div>


                            <span className="action-arrow">
                                →
                            </span>

                        </Link>


                        {/* BUDGETS */}

                        <Link
                            to="/budgets"
                            className="dashboard-action-card"
                        >

                            <div className="action-icon budget-icon">
                                ◈
                            </div>


                            <div className="action-content">

                                <h3>
                                    Budgets
                                </h3>

                                <p>
                                    Plan and manage your
                                    spending limits.
                                </p>

                            </div>


                            <span className="action-arrow">
                                →
                            </span>

                        </Link>


                        {/* CATEGORIES */}

                        <Link
                            to="/categories"
                            className="dashboard-action-card"
                        >

                            <div className="action-icon category-icon">
                                #
                            </div>


                            <div className="action-content">

                                <h3>
                                    Categories
                                </h3>

                                <p>
                                    Organize your income
                                    and expenses.
                                </p>

                            </div>


                            <span className="action-arrow">
                                →
                            </span>

                        </Link>

                    </div>

                </section>


                {/* =================================================
                    DOWNLOAD ACCOUNT DATA
                ================================================= */}

                <section className="dashboard-download">

                    <div className="download-header">

                        <div>

                            <span className="download-eyebrow">
                                ACCOUNT DATA
                            </span>

                            <h2>
                                Download Your Data
                            </h2>

                            <p>
                                Download your income, expenses,
                                budgets and categories.
                            </p>

                        </div>

                    </div>


                    {downloadError && (

                        <div className="download-error">
                            {downloadError}
                        </div>

                    )}


                    <div className="download-options">


                        {/* WEEKLY */}

                        <button
                            type="button"
                            onClick={() =>
                                handleDownload(
                                    "weekly"
                                )
                            }
                            disabled={
                                downloading !== ""
                            }
                            className="download-button"
                        >

                            {downloading === "weekly"
                                ? "Downloading..."
                                : "Download Weekly"}

                        </button>


                        {/* MONTHLY */}

                        <button
                            type="button"
                            onClick={() =>
                                handleDownload(
                                    "monthly"
                                )
                            }
                            disabled={
                                downloading !== ""
                            }
                            className="download-button"
                        >

                            {downloading === "monthly"
                                ? "Downloading..."
                                : "Download Monthly"}

                        </button>


                        {/* YEARLY */}

                        <button
                            type="button"
                            onClick={() =>
                                handleDownload(
                                    "yearly"
                                )
                            }
                            disabled={
                                downloading !== ""
                            }
                            className="download-button"
                        >

                            {downloading === "yearly"
                                ? "Downloading..."
                                : "Download Yearly"}

                        </button>

                    </div>

                </section>


                {/* =================================================
                    QUICK TIP
                ================================================= */}

                <section className="dashboard-tip">

                    <div className="tip-icon">
                        💡
                    </div>


                    <div>

                        <span>
                            FINTRACK TIP
                        </span>

                        <h3>
                            Stay consistent with your finances
                        </h3>

                        <p>
                            Regularly updating your income,
                            expenses and budgets helps you
                            understand your financial position.
                        </p>

                    </div>

                </section>

            </div>

        </main>
    );
};


export default Dashboard;