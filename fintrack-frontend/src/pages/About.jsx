import { Link } from "react-router-dom";

import "./About.css";

function About() {

    return (
        <main className="about-page">

            <section className="about-hero">

                <div className="about-hero-content">

                    <span>
                        ABOUT FINTRACK
                    </span>

                    <h1>
                        Making financial
                        decisions simpler.
                    </h1>

                    <p>
                        FinTrack is a financial utility platform
                        created to make everyday financial
                        calculations easier, faster and more
                        understandable.
                    </p>

                </div>

            </section>


            <section className="about-story">

                <div className="about-story-container">

                    <div>

                        <span className="about-label">
                            OUR PURPOSE
                        </span>

                        <h2>
                            Financial tools should
                            be simple.
                        </h2>

                    </div>

                    <div>

                        <p>
                            Financial decisions often require
                            calculations that can be confusing
                            or time-consuming.
                        </p>

                        <p>
                            FinTrack brings useful financial
                            utilities together in one convenient
                            platform so users can perform
                            calculations quickly and understand
                            their results.
                        </p>

                        <p>
                            Our goal is to build a reliable
                            collection of practical tools that
                            anyone can use.
                        </p>

                    </div>

                </div>

            </section>


            <section className="about-values">

                <div className="about-section-heading">

                    <span>
                        OUR VALUES
                    </span>

                    <h2>
                        What FinTrack stands for
                    </h2>

                </div>


                <div className="values-grid">

                    <div className="value-card">

                        <div className="value-number">
                            01
                        </div>

                        <h3>
                            Simplicity
                        </h3>

                        <p>
                            Tools should be easy to understand
                            and straightforward to use.
                        </p>

                    </div>


                    <div className="value-card">

                        <div className="value-number">
                            02
                        </div>

                        <h3>
                            Accuracy
                        </h3>

                        <p>
                            Financial calculations should provide
                            dependable and meaningful results.
                        </p>

                    </div>


                    <div className="value-card">

                        <div className="value-number">
                            03
                        </div>

                        <h3>
                            Accessibility
                        </h3>

                        <p>
                            Useful financial utilities should be
                            available whenever users need them.
                        </p>

                    </div>

                </div>

            </section>


            <section className="about-cta">

                <h2>
                    Explore FinTrack
                </h2>

                <p>
                    Create your account and start using
                    our financial tools.
                </p>

                <Link
                    to="/register"
                    className="about-button"
                >
                    Get Started
                </Link>

            </section>

        </main>
    );
}

export default About;