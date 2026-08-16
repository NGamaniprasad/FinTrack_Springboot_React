



import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {

    const token = localStorage.getItem("token");

    const role = (
        localStorage.getItem("role") || ""
    )
        .trim()
        .toUpperCase()
        .replace("ROLE_", "");

    const isLoggedIn = !!token;

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        localStorage.removeItem("userId");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");

        window.location.href = "/";
    };


    return (
        <footer className="footer">

            <div className="footer-container">

                {/* =================================================
                    LOGO / DESCRIPTION
                ================================================= */}

                <div className="footer-brand">

                    <Link
                        to="/"
                        className="footer-logo"
                    >
                        Fin<span>Track</span>
                    </Link>

                    <p>
                        Simple financial tools to help you
                        understand and manage your money.
                    </p>

                </div>


                {/* =================================================
                    NOT LOGGED IN
                ================================================= */}

                {!isLoggedIn && (

                    <>

                        <div className="footer-column">

                            <h3>
                                Navigation
                            </h3>

                            <Link to="/">
                                Home
                            </Link>

                            <Link to="/about">
                                About
                            </Link>

                            <Link to="/contact">
                                Contact
                            </Link>

                        </div>


                        <div className="footer-column">

                            <h3>
                                Account
                            </h3>

                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>

                            <Link to="/admin/login">
                                Admin Login
                            </Link>

                        </div>

                    </>

                )}


                {/* =================================================
                    USER LOGGED IN
                ================================================= */}

                {isLoggedIn && role === "USER" && (

                    <>

                        <div className="footer-column">

                            <h3>
                                Navigation
                            </h3>

                            <Link to="/">
                                Home
                            </Link>

                            <Link to="/dashboard">
                                Dashboard
                            </Link>

                            <Link to="/income">
                                Income
                            </Link>

                            <Link to="/expenses">
                                Expenses
                            </Link>

                        </div>


                        <div className="footer-column">

                            <h3>
                                Financial Management
                            </h3>

                            <Link to="/budgets">
                                Budgets
                            </Link>

                            <Link to="/categories">
                                Categories
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="footer-logout"
                            >
                                Logout
                            </button>

                        </div>

                    </>

                )}


                {/* =================================================
                    ADMIN LOGGED IN
                ================================================= */}

                {isLoggedIn && role === "ADMIN" && (

                    <>

                        <div className="footer-column">

                            <h3>
                                Administration
                            </h3>

                            <Link to="/">
                                Home
                            </Link>

                            <Link to="/admin/dashboard">
                                Admin Dashboard
                            </Link>

                            <Link to="/admin/users">
                                Users
                            </Link>

                        </div>


                        <div className="footer-column">

                            <h3>
                                Management
                            </h3>

                            <Link to="/admin/categories">
                                Categories
                            </Link>

                            <Link to="/admin/budgets">
                                Budgets
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="footer-logout"
                            >
                                Logout
                            </button>

                        </div>

                    </>

                )}

            </div>


            {/* =================================================
                COPYRIGHT
            ================================================= */}

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} FinTrack.
                    All rights reserved.
                </p>

                <div>

                    <Link to="/privacy">
                        Privacy Policy
                    </Link>

                    <Link to="/terms">
                        Terms of Use
                    </Link>

                </div>

            </div>

        </footer>
    );
}

export default Footer;

