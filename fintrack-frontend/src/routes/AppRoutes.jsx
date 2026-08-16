
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import TermsOfUse from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/AdminLogin";

import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUsers from "../pages/AdminUsers";

import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

import ProtectedRoute from "../components/ProtectedRoute";
import Categories from "../pages/Categories";
import Income from "../pages/Income";
import Expenses from "../pages/Expenses";
import Budgets from "../pages/Budgets";

import AdminProfile from "../pages/AdminProfile";
function AppContent() {

    const location = useLocation();

    // Footer and Cookie Banner only on Home
    const isHomePage = location.pathname === "/";


    return (
        <>

            {/* =========================
                NAVBAR
            ========================= */}

            <Navbar />


            <Routes>

                {/* =========================
                    HOME
                ========================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* =========================
                    PUBLIC PAGES
                ========================= */}

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/terms"
                    element={<TermsOfUse />}
                />

                <Route
                    path="/privacy"
                    element={<PrivacyPolicy />}
                />


                {/* =========================
                    USER AUTH
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    ADMIN LOGIN
                ========================= */}

                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />


                {/* =================================================
                    USER PROTECTED ROUTES
                ================================================= */}

                <Route
                    element={
                        <ProtectedRoute role="USER" />
                    }
                >

                    {/* USER DASHBOARD */}

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />


                    {/* USER PROFILE */}

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />


                    {/* CHANGE PASSWORD */}

                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />


                    {/* INCOME */}

                    <Route path="/income" element={<Income />} />


                    {/* EXPENSES */}

                    <Route path="/budgets" element={<Budgets />} />


                    {/* BUDGETS */}

                    <Route
                        path="/budgets"
                        element={
                            <div>Budgets Page</div>
                        }
                    />


                    {/* CATEGORIES */}

                    <Route
    path="/categories"
    element={<Categories />}
/>
<Route
    path="/expenses"
    element={<Expenses />}
/>

                </Route>


                {/* =================================================
                    ADMIN PROTECTED ROUTES
                ================================================= */}

                <Route
                    element={
                        <ProtectedRoute role="ADMIN" />
                    }
                >

                    {/* ADMIN DASHBOARD */}

                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />


                    {/* ADMIN USER MANAGEMENT */}

                    <Route
                        path="/admin/users"
                        element={<AdminUsers />}
                    />


                    {/* ADMIN CATEGORIES */}

                    <Route
                        path="/admin/categories"
                        element={
                            <div>Categories Page</div>
                        }
                    />
                    <Route
    path="/admin/profile"
    element={<AdminProfile />}
/>


                    {/* ADMIN BUDGETS */}

                    <Route
                        path="/admin/budgets"
                        element={
                            <div>Budgets Page</div>
                        }
                    />

                </Route>


                {/* =========================
                    UNKNOWN URL
                ========================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>


            {/* =========================
                HOME FOOTER ONLY
            ========================= */}

            {isHomePage && <Footer />}


            {/* =========================
                HOME COOKIE BANNER ONLY
            ========================= */}

            {isHomePage && <CookieBanner />}

        </>
    );
}


function AppRoutes() {

    return (
        <BrowserRouter>

            <AppContent />

        </BrowserRouter>
    );
}


export default AppRoutes;
