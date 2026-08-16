


import { Link } from "react-router-dom";

import "./Home.css";

function Home() {

    return (
        <main className="home">

            {/* =========================================
                HERO
            ========================================= */}

            <section className="home-hero">

                <div className="home-hero-container">

                    <div className="home-hero-content">

                        <div className="hero-badge">
                            FINANCIAL TOOLS MADE SIMPLE
                        </div>

                        <h1>
                            Make Better
                            <span> Financial Decisions</span>
                        </h1>

                        <p>
                            FinTrack gives you simple, fast and reliable
                            financial tools to help you understand your
                            money and plan your future.
                        </p>

                        <div className="hero-actions">

                            <Link
                                to="/register"
                                className="home-primary-btn"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/about"
                                className="home-secondary-btn"
                            >
                                Learn More
                            </Link>

                        </div>

                    </div>


                    {/* =====================================
                        FINANCIAL CARD
                    ===================================== */}

                    <div className="hero-visual">

                        <div className="finance-card">

                            <div className="finance-card-header">

                                <span>
                                    Financial Overview
                                </span>

                                <span className="card-dot">
                                    ●
                                </span>

                            </div>

                            <div className="balance-label">
                                Total Planning
                            </div>

                            <div className="balance">
                                ₹ 1,25,000
                            </div>

                            <div className="finance-lines">

                                <div>
                                    <span>
                                        Monthly EMI
                                    </span>

                                    <strong>
                                        ₹8,450
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Interest
                                    </span>

                                    <strong>
                                        ₹2,120
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Savings
                                    </span>

                                    <strong>
                                        ₹18,500
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                WHY FINTRACK
            ========================================= */}

            <section className="why-section">

                <div className="why-container">

                    <div className="why-content">

                        <span>
                            WHY FINTRACK
                        </span>

                        <h2>
                            Understand your finances
                            without the complexity.
                        </h2>

                        <p>
                            Financial calculations should not be
                            complicated. FinTrack brings useful
                            financial utilities together in one
                            simple platform.
                        </p>

                        <Link
                            to="/about"
                            className="home-primary-btn"
                        >
                            About FinTrack
                        </Link>

                    </div>


                    <div className="why-points">

                        <div className="why-point">

                            <div className="why-number">
                                01
                            </div>

                            <div>

                                <h3>
                                    Simple
                                </h3>

                                <p>
                                    Easy-to-understand interfaces
                                    for everyday financial tasks.
                                </p>

                            </div>

                        </div>


                        <div className="why-point">

                            <div className="why-number">
                                02
                            </div>

                            <div>

                                <h3>
                                    Fast
                                </h3>

                                <p>
                                    Get calculations and results
                                    without unnecessary steps.
                                </p>

                            </div>

                        </div>


                        <div className="why-point">

                            <div className="why-number">
                                03
                            </div>

                            <div>

                                <h3>
                                    Useful
                                </h3>

                                <p>
                                    Practical tools designed around
                                    real financial needs.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                CALL TO ACTION
            ========================================= */}

            <section className="home-cta">

                <div>

                    <h2>
                        Start using FinTrack today.
                    </h2>

                    <p>
                        Create your account and access your
                        financial tools.
                    </p>

                    <Link
                        to="/register"
                        className="home-cta-btn"
                    >
                        Create Free Account
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Home;

