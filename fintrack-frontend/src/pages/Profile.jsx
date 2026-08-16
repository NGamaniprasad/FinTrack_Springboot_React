import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../services/api";

import "./Profile.css";


const Profile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD PROFILE
    // =====================================================

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


        // User must be logged in

        if (!token || role !== "USER") {

            navigate(
                "/login",
                {
                    replace: true
                }
            );

            return;
        }


        const loadProfile = async () => {

            try {

                const data =
                    await getProfile();

                console.log(
                    "USER PROFILE:",
                    data
                );

                setProfile(data);

            } catch (err) {

                console.error(
                    "PROFILE ERROR:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load profile"
                );

            } finally {

                setLoading(false);
            }
        };


        loadProfile();

    }, [navigate]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <main className="profile-page">

                <div className="profile-container">

                    <div className="profile-message">

                        Loading your profile...

                    </div>

                </div>

            </main>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <main className="profile-page">

                <div className="profile-container">

                    <div className="profile-error">

                        {error}

                    </div>


                    <button
                        className="profile-back-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </div>

            </main>
        );
    }


    // =====================================================
    // PROFILE
    // =====================================================

    return (

        <main className="profile-page">

            <div className="profile-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="profile-header">

                    <div className="profile-avatar">

                        {(
                            profile?.fullName ||
                            "U"
                        )
                            .charAt(0)
                            .toUpperCase()}

                    </div>


                    <div>

                        <span className="profile-label">
                            FINTRACK
                        </span>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            Manage your account information
                        </p>

                    </div>

                </div>


                {/* =================================================
                    PROFILE CARD
                ================================================= */}

                <div className="profile-card">

                    <div className="profile-card-header">

                        <div>

                            <h2>
                                Account Information
                            </h2>

                            <p>
                                Your registered FinTrack account details
                            </p>

                        </div>

                    </div>


                    {/* FULL NAME */}

                    <div className="profile-info-row">

                        <div className="profile-info-icon">
                            👤
                        </div>

                        <div className="profile-info-content">

                            <span>
                                Full Name
                            </span>

                            <strong>
                                {profile?.fullName || "Not available"}
                            </strong>

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="profile-info-row">

                        <div className="profile-info-icon">
                            ✉
                        </div>

                        <div className="profile-info-content">

                            <span>
                                Email Address
                            </span>

                            <strong>
                                {profile?.email || "Not available"}
                            </strong>

                        </div>

                    </div>


                    {/* ROLE */}

                    <div className="profile-info-row">

                        <div className="profile-info-icon">
                            🛡
                        </div>

                        <div className="profile-info-content">

                            <span>
                                Account Type
                            </span>

                            <strong>
                                {profile?.role || "USER"}
                            </strong>

                        </div>

                    </div>


                    {/* USER ID */}

                    <div className="profile-info-row">

                        <div className="profile-info-icon">
                            #
                        </div>

                        <div className="profile-info-content">

                            <span>
                                User ID
                            </span>

                            <strong>
                                {profile?.id || "Not available"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SECURITY CARD
                ================================================= */}

                <div className="profile-security-card">

                    <div className="profile-security-icon">
                        🔒
                    </div>


                    <div className="profile-security-content">

                        <h2>
                            Account Security
                        </h2>

                        <p>
                            Keep your account secure by
                            regularly updating your password.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="profile-password-button"
                        onClick={() =>
                            navigate("/change-password")
                        }
                    >
                        Change Password
                    </button>

                </div>


                {/* =================================================
                    BACK BUTTON
                ================================================= */}

                <button
                    type="button"
                    className="profile-back-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>

            </div>

        </main>
    );
};


export default Profile;