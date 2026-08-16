
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAdminProfile,
    updateAdminProfile,
    changeAdminPassword
} from "../services/api";

import "./AdminProfile.css";


const AdminProfile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        fullName: "",
        email: ""
    });

    const [profileLoading, setProfileLoading] = useState(true);
    const [profileSaving, setProfileSaving] = useState(false);

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [passwordSaving, setPasswordSaving] =
        useState(false);

    const [profileMessage, setProfileMessage] =
        useState("");

    const [profileError, setProfileError] =
        useState("");

    const [passwordMessage, setPasswordMessage] =
        useState("");

    const [passwordError, setPasswordError] =
        useState("");


    /* =========================================================
       LOAD ADMIN PROFILE
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


        if (!token || role !== "ADMIN") {

            navigate("/admin/login", {
                replace: true
            });

            return;
        }


        const loadProfile = async () => {

            try {

                const data =
                    await getAdminProfile();

                setProfile({
                    fullName:
                        data.fullName || "",

                    email:
                        data.email || ""
                });

            } catch (err) {

                setProfileError(
                    err.message ||
                    "Unable to load admin profile."
                );

            } finally {

                setProfileLoading(false);
            }
        };


        loadProfile();

    }, [navigate]);


    /* =========================================================
       UPDATE PROFILE
    ========================================================= */

    const handleProfileSubmit = async (e) => {

        e.preventDefault();

        setProfileMessage("");
        setProfileError("");


        if (
            !profile.fullName.trim() ||
            !profile.email.trim()
        ) {

            setProfileError(
                "Full name and email are required."
            );

            return;
        }


        try {

            setProfileSaving(true);

            const data =
                await updateAdminProfile({
                    fullName:
                        profile.fullName.trim(),

                    email:
                        profile.email.trim()
                });


            setProfileMessage(
                data.message ||
                "Profile updated successfully."
            );


            // Update locally stored admin name
            localStorage.setItem(
                "fullName",
                data.fullName ||
                profile.fullName
            );


            // Update locally stored email
            if (data.email) {

                localStorage.setItem(
                    "email",
                    data.email
                );
            }

        } catch (err) {

            setProfileError(
                err.message ||
                "Unable to update profile."
            );

        } finally {

            setProfileSaving(false);
        }
    };


    /* =========================================================
       CHANGE PASSWORD
    ========================================================= */

    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        setPasswordMessage("");
        setPasswordError("");


        if (!currentPassword) {

            setPasswordError(
                "Current password is required."
            );

            return;
        }


        if (!newPassword) {

            setPasswordError(
                "New password is required."
            );

            return;
        }


        if (newPassword.length < 6) {

            setPasswordError(
                "New password must be at least 6 characters."
            );

            return;
        }


        if (newPassword !== confirmPassword) {

            setPasswordError(
                "New password and confirm password do not match."
            );

            return;
        }


        try {

            setPasswordSaving(true);

            const data =
                await changeAdminPassword({
                    currentPassword,
                    newPassword
                });


            setPasswordMessage(
                data.message ||
                "Password changed successfully."
            );


            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {

            setPasswordError(
                err.message ||
                "Unable to change password."
            );

        } finally {

            setPasswordSaving(false);
        }
    };


    /* =========================================================
       LOADING
    ========================================================= */

    if (profileLoading) {

        return (
            <main className="admin-profile-page">

                <div className="admin-profile-container">

                    <div className="admin-profile-loading">

                        <div className="admin-loading-spinner"></div>

                        <h2>
                            Loading Admin Profile
                        </h2>

                        <p>
                            Please wait...
                        </p>

                    </div>

                </div>

            </main>
        );
    }


    /* =========================================================
       PAGE
    ========================================================= */

    return (

        <main className="admin-profile-page">

            <div className="admin-profile-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="admin-profile-header">

                    <span className="admin-label">
                        FINTRACK ADMIN
                    </span>

                    <h1>
                        Admin Profile
                    </h1>

                    <p>
                        Update your administrator profile
                        and password.
                    </p>

                </section>


                {/* =================================================
                    PROFILE CARD
                ================================================= */}

                <section className="admin-profile-card">

                    <div className="admin-profile-card-header">

                        <div>

                            <span>
                                ACCOUNT
                            </span>

                            <h2>
                                Profile Information
                            </h2>

                        </div>

                        <div className="admin-profile-icon">
                            P
                        </div>

                    </div>


                    {profileError && (

                        <div className="admin-profile-error">
                            {profileError}
                        </div>

                    )}


                    {profileMessage && (

                        <div className="admin-profile-success">
                            {profileMessage}
                        </div>

                    )}


                    <form
                        onSubmit={
                            handleProfileSubmit
                        }
                    >

                        <div className="admin-profile-form-grid">


                            {/* FULL NAME */}

                            <div className="admin-form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={
                                        profile.fullName
                                    }
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            fullName:
                                                e.target.value
                                        })
                                    }
                                    placeholder="Enter full name"
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="admin-form-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={
                                        profile.email
                                    }
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            email:
                                                e.target.value
                                        })
                                    }
                                    placeholder="Enter email"
                                    required
                                />

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="admin-profile-save-button"
                            disabled={profileSaving}
                        >

                            {profileSaving
                                ? "Saving..."
                                : "Update Profile"
                            }

                        </button>

                    </form>

                </section>


                {/* =================================================
                    PASSWORD CARD
                ================================================= */}

                <section className="admin-profile-card">

                    <div className="admin-profile-card-header">

                        <div>

                            <span>
                                SECURITY
                            </span>

                            <h2>
                                Change Password
                            </h2>

                        </div>

                        <div className="admin-profile-icon">
                            🔒
                        </div>

                    </div>


                    {passwordError && (

                        <div className="admin-profile-error">
                            {passwordError}
                        </div>

                    )}


                    {passwordMessage && (

                        <div className="admin-profile-success">
                            {passwordMessage}
                        </div>

                    )}


                    <form
                        onSubmit={
                            handlePasswordSubmit
                        }
                    >


                        {/* CURRENT PASSWORD */}

                        <div className="admin-form-group">

                            <label>
                                Current Password
                            </label>

                            <input
                                type="password"
                                value={
                                    currentPassword
                                }
                                onChange={(e) =>
                                    setCurrentPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter current password"
                                required
                            />

                        </div>


                        {/* NEW PASSWORD */}

                        <div className="admin-form-group">

                            <label>
                                New Password
                            </label>

                            <input
                                type="password"
                                value={
                                    newPassword
                                }
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter new password"
                                required
                            />

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="admin-form-group">

                            <label>
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                value={
                                    confirmPassword
                                }
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Confirm new password"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="admin-password-button"
                            disabled={passwordSaving}
                        >

                            {passwordSaving
                                ? "Changing Password..."
                                : "Change Password"
                            }

                        </button>

                    </form>

                </section>


                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    type="button"
                    className="admin-profile-back-button"
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>

            </div>

        </main>
    );
};


export default AdminProfile;

