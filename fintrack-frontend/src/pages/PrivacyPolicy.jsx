import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {

    return (
        <main className="privacy-page">

            <div className="privacy-container">

                <h1>Privacy Policy</h1>

                <p className="privacy-updated">
                    Last updated: August 2026
                </p>

                <section>
                    <h2>1. Information We Collect</h2>

                    <p>
                        When you create an account, we may collect
                        information such as your name, email address
                        and encrypted password.
                    </p>
                </section>

                <section>
                    <h2>2. How We Use Information</h2>

                    <p>
                        Account information is used to provide
                        authentication and access to FinTrack services.
                    </p>
                </section>

                <section>
                    <h2>3. Password Security</h2>

                    <p>
                        Passwords are stored using secure password
                        hashing techniques and are not stored as
                        plain text.
                    </p>
                </section>

                <section>
                    <h2>4. Cookies</h2>

                    <p>
                        FinTrack may use cookies or browser storage
                        to remember user preferences and improve
                        the application experience.
                    </p>
                </section>

                <section>
                    <h2>5. Contact</h2>

                    <p>
                        If you have questions regarding this policy,
                        please contact our support team.
                    </p>
                </section>

            </div>

        </main>
    );
};

export default PrivacyPolicy;