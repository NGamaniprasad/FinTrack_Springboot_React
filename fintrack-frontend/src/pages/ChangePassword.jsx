import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../services/api";

import "./ChangePassword.css";


const ChangePassword = () => {

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // -----------------------------------------------
        // NEW PASSWORD LENGTH
        // -----------------------------------------------

        if (newPassword.length < 6) {

            setError(
                "New password must contain at least 6 characters."
            );

            return;
        }


        // -----------------------------------------------
        // CONFIRM PASSWORD
        // -----------------------------------------------

        if (newPassword !== confirmPassword) {

            setError(
                "New password and confirm password do not match."
            );

            return;
        }


        try {

            setLoading(true);


            // -------------------------------------------
            // SEND ALL THREE PASSWORD VALUES
            // -------------------------------------------

            await changePassword({

                currentPassword: currentPassword,

                newPassword: newPassword,

                confirmPassword: confirmPassword

            });


            // -------------------------------------------
            // SUCCESS
            // -------------------------------------------

            setSuccess(
                "Password changed successfully."
            );


            // Clear fields

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");


        } catch (err) {

            console.error(
                "CHANGE PASSWORD ERROR:",
                err
            );


            setError(
                err.message ||
                "Unable to change password."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <main className="change-password-page">

            <div className="change-password-container">


                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="change-password-header">

                    <div className="security-icon">
                        🔒
                    </div>

                    <span className="security-label">
                        FINTRACK SECURITY
                    </span>

                    <h1>
                        Change Password
                    </h1>

                    <p>
                        Update your password to keep your
                        account secure.
                    </p>

                </div>


                {/* =========================================
                    CARD
                ========================================= */}

                <div className="change-password-card">


                    <div className="change-password-card-header">

                        <h2>
                            Update Your Password
                        </h2>

                        <p>
                            Enter your current password and
                            choose a new secure password.
                        </p>

                    </div>


                    {/* =====================================
                        ERROR
                    ===================================== */}

                    {error && (

                        <div className="change-password-error">

                            {error}

                        </div>

                    )}


                    {/* =====================================
                        SUCCESS
                    ===================================== */}

                    {success && (

                        <div className="change-password-success">

                            {success}

                        </div>

                    )}


                    {/* =====================================
                        FORM
                    ===================================== */}

                    <form
                        className="change-password-form"
                        onSubmit={handleSubmit}
                    >


                        {/* CURRENT PASSWORD */}

                        <div className="change-password-field">

                            <label htmlFor="currentPassword">
                                Current Password
                            </label>

                            <input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter current password"
                                autoComplete="current-password"
                                required
                                disabled={loading}
                            />

                        </div>


                        {/* NEW PASSWORD */}

                        <div className="change-password-field">

                            <label htmlFor="newPassword">
                                New Password
                            </label>

                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter new password"
                                autoComplete="new-password"
                                minLength={6}
                                required
                                disabled={loading}
                            />

                            <small>
                                Minimum 6 characters
                            </small>

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="change-password-field">

                            <label htmlFor="confirmPassword">
                                Confirm New Password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Confirm new password"
                                autoComplete="new-password"
                                minLength={6}
                                required
                                disabled={loading}
                            />

                        </div>


                        {/* =================================
                            BUTTONS
                        ================================= */}

                        <div className="change-password-actions">

                            <button
                                type="button"
                                className="change-password-cancel"
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                                disabled={loading}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="change-password-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Changing..."
                                    : "Change Password"
                                }

                            </button>

                        </div>

                    </form>


                    {/* BACK */}

                    <button
                        type="button"
                        className="back-dashboard-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        disabled={loading}
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </div>

        </main>
    );
};


export default ChangePassword;