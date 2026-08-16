import "./TermsOfUse.css";

const TermsOfUse = () => {

    return (
        <main className="legal-page">

            <div className="legal-container">

                <h1>Terms of Use</h1>

                <p className="legal-updated">
                    Last updated: August 2026
                </p>

                <section>
                    <h2>1. Acceptance of Terms</h2>

                    <p>
                        By accessing and using FinTrack, you agree
                        to comply with these Terms of Use.
                    </p>
                </section>

                <section>
                    <h2>2. Use of Services</h2>

                    <p>
                        FinTrack provides financial utility tools
                        for informational and calculation purposes.
                        Users should verify important financial
                        decisions independently.
                    </p>
                </section>

                <section>
                    <h2>3. User Accounts</h2>

                    <p>
                        Users are responsible for maintaining the
                        confidentiality of their account credentials
                        and for activities performed using their account.
                    </p>
                </section>

                <section>
                    <h2>4. Limitation of Liability</h2>

                    <p>
                        FinTrack is not responsible for financial
                        losses resulting from reliance on calculations
                        or information provided through the platform.
                    </p>
                </section>

            </div>

        </main>
    );
};

export default TermsOfUse;