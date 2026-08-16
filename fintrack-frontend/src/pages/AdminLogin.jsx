



///

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginAdmin } from "../services/api";

import "./AdminLogin.css";


const AdminLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // =====================================================
    // ADMIN LOGIN
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            // ---------------------------------------------
            // CALL BACKEND
            // ---------------------------------------------

            const response = await loginAdmin({
                email: email.trim(),
                password: password
            });


            console.log(
                "ADMIN LOGIN RESPONSE:",
                response
            );


            // ---------------------------------------------
            // TOKEN CHECK
            // ---------------------------------------------

            if (
                !response ||
                !response.token
            ) {

                throw new Error(
                    "Login successful but authentication token was not received."
                );
            }


            // ---------------------------------------------
            // NORMALIZE ROLE
            // ---------------------------------------------

            const role = String(
                response.role || ""
            )
                .trim()
                .toUpperCase()
                .replace("ROLE_", "");


            console.log(
                "ADMIN ROLE:",
                role
            );


            // ---------------------------------------------
            // ADMIN ROLE CHECK
            // ---------------------------------------------

            if (role !== "ADMIN") {

                throw new Error(
                    "This account does not have admin access."
                );
            }


            // ---------------------------------------------
            // CLEAR OLD LOGIN DATA
            // ---------------------------------------------

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("id");
            localStorage.removeItem("userId");
            localStorage.removeItem("fullName");
            localStorage.removeItem("email");


            // ---------------------------------------------
            // SAVE ADMIN LOGIN DATA
            // ---------------------------------------------

            localStorage.setItem(
                "token",
                response.token
            );

            localStorage.setItem(
                "role",
                role
            );

            localStorage.setItem(
                "id",
                response.id ?? ""
            );

            localStorage.setItem(
                "userId",
                response.id ?? ""
            );

            localStorage.setItem(
                "fullName",
                response.fullName ?? ""
            );

            localStorage.setItem(
                "email",
                response.email ?? email
            );


            // ---------------------------------------------
            // VERIFY STORAGE
            // ---------------------------------------------

            console.log(
                "ADMIN TOKEN:",
                localStorage.getItem("token")
            );

            console.log(
                "ADMIN ROLE:",
                localStorage.getItem("role")
            );


            // ---------------------------------------------
            // ADMIN DASHBOARD
            // ---------------------------------------------

            navigate(
                "/admin/dashboard",
                {
                    replace: true
                }
            );


        } catch (err) {

            console.error(
                "ADMIN LOGIN ERROR:",
                err
            );


            setError(
                err.message ||
                "Admin login failed. Please check your email and password."
            );


        } finally {

            setLoading(false);
        }
    };


    return (

        <main className="admin-login-page">

            <div className="admin-login-card">


                {/* =========================================
                    ADMIN BADGE
                ========================================== */}

                <div className="admin-badge">
                    ADMIN
                </div>


                {/* =========================================
                    TITLE
                ========================================== */}

                <h1>
                    Admin Login
                </h1>


                <p>
                    Sign in to the FinTrack administration panel.
                </p>


                {/* =========================================
                    ERROR
                ========================================== */}

                {error && (

                    <div className="admin-login-error">
                        {error}
                    </div>

                )}


                {/* =========================================
                    FORM
                ========================================== */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* EMAIL */}

                    <label htmlFor="admin-email">
                        Email
                    </label>

                    <input
                        id="admin-email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Admin email"
                        autoComplete="email"
                        required
                        disabled={loading}
                    />


                    {/* PASSWORD */}

                    <label htmlFor="admin-password">
                        Password
                    </label>

                    <input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Admin password"
                        autoComplete="current-password"
                        required
                        disabled={loading}
                    />


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Admin Login"
                        }

                    </button>

                </form>


                {/* =========================================
                    USER LOGIN
                ========================================== */}

                <Link
                    to="/login"
                    className="back-user-login"
                >
                    User Login
                </Link>


            </div>

        </main>
    );
};


export default AdminLogin;