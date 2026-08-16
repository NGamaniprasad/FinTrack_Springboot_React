
import { useState } from "react";
import "./Contact.css";

const API_BASE_URL = "http://localhost:8080/api";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setSubmitted(false);
        setError("");
    };


    // =========================================================
    // SEND CUSTOMER MESSAGE
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setSubmitted(false);
        setError("");

        try {

            const response = await fetch(
                `${API_BASE_URL}/contact`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to send your message."
                );
            }


            // Success

            setSubmitted(true);

            setFormData({
                name: "",
                email: "",
                message: ""
            });


        } catch (err) {

            console.error(
                "CONTACT MESSAGE ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to send your message."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <main className="contact-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <section className="contact-header">

                <h1>
                    Contact Us
                </h1>

                <p>
                    Have a question or feedback?
                    Send us a message.
                </p>

            </section>


            {/* =================================================
                CONTACT CONTAINER
            ================================================= */}

            <section className="contact-container">


                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}

                <div className="contact-info">

                    <h2>
                        Get in touch
                    </h2>

                    <p>
                        We would love to hear your feedback
                        and suggestions about FinTrack.
                    </p>


                    <div className="contact-item">

                        <strong>
                            Email
                        </strong>

                        <span>
                            support@fintrack.com
                        </span>

                    </div>


                    <div className="contact-item">

                        <strong>
                            Support
                        </strong>

                        <span>
                            Monday - Friday
                        </span>

                    </div>

                </div>


                {/* =================================================
                    CONTACT FORM
                ================================================= */}

                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                >


                    {/* NAME */}

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />


                    {/* EMAIL */}

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />


                    {/* MESSAGE */}

                    <label>
                        Message
                    </label>

                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Write your message"
                        required
                    />


                    {/* ERROR */}

                    {error && (

                        <p className="contact-error">
                            {error}
                        </p>

                    )}


                    {/* SUCCESS */}

                    {submitted && (

                        <p className="contact-success">
                            Thank you! Your message has been
                            received successfully.
                        </p>

                    )}


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Sending..."
                            : "Send Message"
                        }

                    </button>

                </form>

            </section>

        </main>
    );
};


export default Contact;

