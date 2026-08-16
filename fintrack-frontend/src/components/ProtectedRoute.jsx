import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {

    const token = localStorage.getItem("token");

    const userRole = (
        localStorage.getItem("role") || ""
    )
        .trim()
        .toUpperCase()
        .replace("ROLE_", "");


    // ==============================
    // NOT LOGGED IN
    // ==============================

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // ==============================
    // ROLE CHECK
    // ==============================

    if (
        role &&
        userRole !== role.toUpperCase()
    ) {

        if (userRole === "ADMIN") {

            return (
                <Navigate
                    to="/admin/dashboard"
                    replace
                />
            );
        }


        if (userRole === "USER") {

            return (
                <Navigate
                    to="/dashboard"
                    replace
                />
            );
        }


        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    // ==============================
    // ALLOW PAGE
    // ==============================

    return <Outlet />;
};

export default ProtectedRoute;