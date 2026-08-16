



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/api";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await loginUser({
                email: email.trim(),
                password
            });

            console.log("LOGIN RESPONSE:", response);


            if (!response || !response.token) {

                throw new Error(
                    "Login successful but authentication token was not received."
                );
            }


            const role = String(response.role || "")
                .trim()
                .toUpperCase()
                .replace("ROLE_", "");


            console.log("LOGIN ROLE:", role);


            localStorage.setItem(
                "token",
                response.token
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

            localStorage.setItem(
                "role",
                role
            );


            if (role === "USER") {

                navigate(
                    "/dashboard",
                    {
                        replace: true
                    }
                );

                return;
            }


            if (role === "ADMIN") {

                navigate(
                    "/admin/dashboard",
                    {
                        replace: true
                    }
                );

                return;
            }


            localStorage.clear();

            throw new Error(
                `Invalid role received: ${response.role}`
            );

        } catch (err) {

            console.error(
                "LOGIN ERROR:",
                err
            );

            setError(
                err.message ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <main className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <div className="login-brand">
                        Fin<span>Track</span>
                    </div>

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Sign in to your FinTrack account
                    </p>

                </div>


                {error && (

                    <div className="login-error">
                        {error}
                    </div>

                )}


                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <div className="login-field">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            autoComplete="email"
                            required
                            disabled={loading}
                        />

                    </div>


                    <div className="login-field">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="current-password"
                            required
                            disabled={loading}
                        />

                    </div>


                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>


                <div className="login-footer">

                    <p>

                        Don't have an account?{" "}

                        <Link to="/register">
                            Register
                        </Link>

                    </p>


                    <Link
                        to="/admin/login"
                        className="admin-login-link"
                    >
                        Admin Login
                    </Link>

                </div>

            </div>

        </main>
    );
};

export default Login;

