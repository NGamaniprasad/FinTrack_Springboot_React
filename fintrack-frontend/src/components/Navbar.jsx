



import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const role = String(
        localStorage.getItem("role") || ""
    )
        .trim()
        .toUpperCase()
        .replace("ROLE_", "");


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("userId");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        setMenuOpen(false);

        navigate("/", {
            replace: true
        });
    };


    const closeMenu = () => {
        setMenuOpen(false);
    };


    /* =====================================================
       LOGGED-IN USER NAVBAR
    ===================================================== */

    if (token && role === "USER") {

        return (

            <nav className="navbar">

                <div className="navbar-container">

                    <Link
                        to="/dashboard"
                        className="navbar-brand"
                        onClick={closeMenu}
                    >
                        Fin<span>Track</span>
                    </Link>


                    <button
                        type="button"
                        className="navbar-menu-button"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                    >
                        ☰
                    </button>


                    <div
                        className={`navbar-links ${
                            menuOpen
                                ? "navbar-links-open"
                                : ""
                        }`}
                    >

                        <Link
                            to="/dashboard"
                            onClick={closeMenu}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/income"
                            onClick={closeMenu}
                        >
                            Income
                        </Link>

                        <Link
                            to="/expenses"
                            onClick={closeMenu}
                        >
                            Expenses
                        </Link>

                        <Link
                            to="/budgets"
                            onClick={closeMenu}
                        >
                            Budgets
                        </Link>

                        <Link
                            to="/categories"
                            onClick={closeMenu}
                        >
                            Categories
                        </Link>


                        <div className="navbar-user-menu">

                            <button
                                type="button"
                                className="navbar-user-button"
                                onClick={() =>
                                    setMenuOpen(
                                        !menuOpen
                                    )
                                }
                            >
                                👤{" "}
                                {localStorage.getItem(
                                    "fullName"
                                ) || "User"}
                            </button>

                        </div>


                        <Link
                            to="/profile"
                            className="navbar-profile-link"
                            onClick={closeMenu}
                        >
                            Profile
                        </Link>

                        <Link
                            to="/change-password"
                            className="navbar-password-link"
                            onClick={closeMenu}
                        >
                            Change Password
                        </Link>


                        <button
                            type="button"
                            className="navbar-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>
        );
    }


    /* =====================================================
       LOGGED-IN ADMIN NAVBAR
    ===================================================== */

    if (token && role === "ADMIN") {

        return (

            <nav className="navbar">

                <div className="navbar-container">

                    <Link
                        to="/admin/dashboard"
                        className="navbar-brand"
                    >
                        Fin<span>Track</span>
                    </Link>


                    <button
                        type="button"
                        className="navbar-menu-button"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                    >
                        ☰
                    </button>


                    <div
                        className={`navbar-links ${
                            menuOpen
                                ? "navbar-links-open"
                                : ""
                        }`}
                    >

                        <Link
                            to="/admin/dashboard"
                            onClick={closeMenu}
                        >
                            Admin Dashboard
                        </Link>

                        <Link
                            to="/admin/users"
                            onClick={closeMenu}
                        >
                            Users
                        </Link>

                        


                        <button
                            type="button"
                            className="navbar-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>
        );
    }


    /* =====================================================
       PUBLIC NAVBAR
    ===================================================== */

    return (

        <nav className="navbar">

            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-brand"
                >
                    Fin<span>Track</span>
                </Link>


                <button
                    type="button"
                    className="navbar-menu-button"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                >
                    ☰
                </button>


                <div
                    className={`navbar-links ${
                        menuOpen
                            ? "navbar-links-open"
                            : ""
                    }`}
                >

                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        onClick={closeMenu}
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        onClick={closeMenu}
                    >
                        Contact
                    </Link>


                    <Link
                        to="/login"
                        className="navbar-login"
                        onClick={closeMenu}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="navbar-register"
                        onClick={closeMenu}
                    >
                        Register
                    </Link>

                    <Link
                        to="/admin/login"
                        className="navbar-admin-login"
                        onClick={closeMenu}
                    >
                        Admin Login
                    </Link>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;

