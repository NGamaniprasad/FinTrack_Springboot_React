




import { useEffect, useState } from "react";

import "./CookieBanner.css";

function CookieBanner() {

    const [visible, setVisible] = useState(false);


    useEffect(() => {

        // ==========================================
        // CHECK LOGIN STATUS
        // ==========================================

        const token =
            localStorage.getItem("token");

        // If USER or ADMIN is logged in,
        // do not show the public cookie banner.

        if (token) {
            setVisible(false);
            return;
        }


        // ==========================================
        // CHECK COOKIE CONSENT
        // ==========================================

        const consent =
            localStorage.getItem(
                "fintrack_cookie_consent"
            );

        if (!consent) {
            setVisible(true);
        }

    }, []);


    // ==========================================
    // CONSENT
    // ==========================================

    const handleConsent = (value) => {

        localStorage.setItem(
            "fintrack_cookie_consent",
            value
        );

        setVisible(false);
    };


    // ==========================================
    // HIDE BANNER
    // ==========================================

    if (!visible) {
        return null;
    }


    return (
        <div className="cookie-banner">

            <div className="cookie-inner">

                <div className="cookie-text">

                    <h3>
                        We use cookies
                    </h3>

                    <p>
                        We use cookies to improve your experience,
                        remember preferences and provide a better
                        service.
                    </p>

                </div>


                <div className="cookie-actions">

                    <button
                        className="cookie-decline"
                        onClick={() =>
                            handleConsent("declined")
                        }
                    >
                        Decline
                    </button>


                    <button
                        className="cookie-accept"
                        onClick={() =>
                            handleConsent("accepted")
                        }
                    >
                        Accept Cookies
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CookieBanner;

