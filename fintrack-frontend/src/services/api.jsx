

///////
///Working 


const API_BASE_URL =
    "http://localhost:8080/api";


/* =====================================================
   COMMON REQUEST
===================================================== */

const request = async (
    url,
    options = {}
) => {

    const response = await fetch(
        `${API_BASE_URL}${url}`,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        }
    );


    const text =
        await response.text();


    let data = {};


    try {

        data = text
            ? JSON.parse(text)
            : {};

    } catch {

        data = {
            message: text
        };
    }


    if (!response.ok) {

        throw new Error(
            data.message ||
            data.error ||
            `Request failed: ${response.status}`
        );
    }


    return data;
};


/* =====================================================
   AUTHENTICATED REQUEST
===================================================== */

const authRequest = async (
    url,
    options = {}
) => {

    const token =
        localStorage.getItem("token");


    if (!token) {

        throw new Error(
            "Authentication token not found"
        );
    }


    return request(
        url,
        {
            ...options,

            headers: {

                Authorization:
                    `Bearer ${token}`,

                ...(options.headers || {})
            }
        }
    );
};


/* =====================================================
   AUTHENTICATION
===================================================== */


/* REGISTER */

export const registerUser =
    async (userData) => {

        return request(
            "/auth/register",
            {
                method: "POST",

                body:
                    JSON.stringify(userData)
            }
        );
    };


/* USER LOGIN */

export const loginUser =
    async (loginData) => {

        return request(
            "/auth/login",
            {
                method: "POST",

                body:
                    JSON.stringify(loginData)
            }
        );
    };


/* ADMIN LOGIN */

export const loginAdmin =
    async (loginData) => {

        return request(
            "/auth/admin/login",
            {
                method: "POST",

                body:
                    JSON.stringify(loginData)
            }
        );
    };


/* =====================================================
   USER PROFILE
===================================================== */

export const getProfile =
    async () => {

        return authRequest(
            "/users/profile",
            {
                method: "GET"
            }
        );
    };


/* =====================================================
   USER DASHBOARD
===================================================== */

export const getDashboard =
    async () => {

        return authRequest(
            "/dashboard",
            {
                method: "GET"
            }
        );
    };


/* =====================================================
   CATEGORIES
===================================================== */

export const getCategories =
    async () => {

        return authRequest(
            "/categories",
            {
                method: "GET"
            }
        );
    };


export const addCategory =
    async (categoryData) => {

        return authRequest(
            "/categories",
            {
                method: "POST",

                body:
                    JSON.stringify(categoryData)
            }
        );
    };


export const updateCategory =
    async (
        id,
        categoryData
    ) => {

        return authRequest(
            `/categories/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify(categoryData)
            }
        );
    };


export const deleteCategory =
    async (id) => {

        return authRequest(
            `/categories/${id}`,
            {
                method: "DELETE"
            }
        );
    };


/* =====================================================
   INCOME
===================================================== */

export const getIncomes =
    async () => {

        return authRequest(
            "/incomes",
            {
                method: "GET"
            }
        );
    };


export const addIncome =
    async (incomeData) => {

        return authRequest(
            "/incomes",
            {
                method: "POST",

                body:
                    JSON.stringify(incomeData)
            }
        );
    };


export const updateIncome =
    async (
        id,
        incomeData
    ) => {

        return authRequest(
            `/incomes/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify(incomeData)
            }
        );
    };


export const deleteIncome =
    async (id) => {

        return authRequest(
            `/incomes/${id}`,
            {
                method: "DELETE"
            }
        );
    };


/* =====================================================
   EXPENSE
===================================================== */

export const getExpenses =
    async () => {

        return authRequest(
            "/expenses",
            {
                method: "GET"
            }
        );
    };


export const addExpense =
    async (expenseData) => {

        return authRequest(
            "/expenses",
            {
                method: "POST",

                body:
                    JSON.stringify(expenseData)
            }
        );
    };


export const updateExpense =
    async (
        id,
        expenseData
    ) => {

        return authRequest(
            `/expenses/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify(expenseData)
            }
        );
    };


export const deleteExpense =
    async (id) => {

        return authRequest(
            `/expenses/${id}`,
            {
                method: "DELETE"
            }
        );
    };


/* =====================================================
   BUDGET
===================================================== */

export const getBudgets =
    async () => {

        return authRequest(
            "/budgets",
            {
                method: "GET"
            }
        );
    };


export const addBudget =
    async (budgetData) => {

        return authRequest(
            "/budgets",
            {
                method: "POST",

                body:
                    JSON.stringify(budgetData)
            }
        );
    };


export const updateBudget =
    async (
        id,
        budgetData
    ) => {

        return authRequest(
            `/budgets/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify(budgetData)
            }
        );
    };


export const deleteBudget =
    async (id) => {

        return authRequest(
            `/budgets/${id}`,
            {
                method: "DELETE"
            }
        );
    };


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

export const getAdminDashboard =
    async () => {

        return authRequest(
            "/admin/dashboard",
            {
                method: "GET"
            }
        );
    };


/* =====================================================
   ADMIN USER MANAGEMENT
===================================================== */


/* GET ALL USERS */

export const getAdminUsers =
    async () => {

        return authRequest(
            "/admin/users",
            {
                method: "GET"
            }
        );
    };


/* GET USER BY ID */

export const getAdminUser =
    async (id) => {

        return authRequest(
            `/admin/users/${id}`,
            {
                method: "GET"
            }
        );
    };


/* UPDATE USER */

export const updateAdminUser =
    async (
        id,
        userData
    ) => {

        return authRequest(
            `/admin/users/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify(userData)
            }
        );
    };


/* ACTIVATE USER */

export const activateAdminUser =
    async (id) => {

        return authRequest(
            `/admin/users/${id}/activate`,
            {
                method: "PUT"
            }
        );
    };


/* DEACTIVATE USER */

export const deactivateAdminUser =
    async (id) => {

        return authRequest(
            `/admin/users/${id}/deactivate`,
            {
                method: "PUT"
            }
        );
    };


/* DELETE USER */

export const deleteAdminUser =
    async (id) => {

        return authRequest(
            `/admin/users/${id}`,
            {
                method: "DELETE"
            }
        );
    };


/* =====================================================
   CHANGE PASSWORD
===================================================== */

export const changePassword =
    async (
        passwordData
    ) => {

        return authRequest(
            "/users/change-password",
            {
                method: "PUT",

                body:
                    JSON.stringify(passwordData)
            }
        );
    };


/* =====================================================
   ACCOUNT DATA EXPORT
===================================================== */

export const downloadAccountData =
    async (period) => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            throw new Error(
                "Authentication token not found."
            );
        }


        const response =
            await fetch(
                `${API_BASE_URL}/export?period=${encodeURIComponent(period)}`,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        if (!response.ok) {

            const text =
                await response.text();


            let message =
                "Unable to download account data.";


            try {

                const data =
                    text
                        ? JSON.parse(text)
                        : {};


                message =
                    data.message ||
                    data.error ||
                    message;

            } catch {

                if (text) {

                    message = text;
                }
            }


            throw new Error(message);
        }


        const blob =
            await response.blob();


        const url =
            window.URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href =
            url;


        /*
         * Backend currently returns CSV.
         * Therefore the file must have .csv extension.
         */

        link.download =
            `FINTRACK_${period.toUpperCase()}_ACCOUNT_DATA.csv`;


        document.body.appendChild(link);


        link.click();


        link.remove();


        window.URL.revokeObjectURL(url);
    };


/* =====================================================
   CONTACT MESSAGE
===================================================== */


/* CUSTOMER SEND MESSAGE */

export const createContactMessage =
    async (
        name,
        email,
        message
    ) => {

        return request(
            "/contact",
            {
                method: "POST",

                body:
                    JSON.stringify({
                        name,
                        email,
                        message
                    })
            }
        );
    };


/* =====================================================
   ADMIN - GET ALL CONTACT MESSAGES
===================================================== */

export const getContactMessages =
    async () => {

        return authRequest(
            "/contact",
            {
                method: "GET"
            }
        );
    };


/* =====================================================
   ADMIN - GET NEW CONTACT MESSAGES
===================================================== */

export const getNewContactMessages =
    async () => {

        return authRequest(
            "/contact/new",
            {
                method: "GET"
            }
        );
    };


/* =====================================================
   ADMIN - GET CONTACT MESSAGE BY ID
===================================================== */

export const getContactMessage =
    async (id) => {

        return authRequest(
            `/contact/${id}`,
            {
                method: "GET"
            }
        );
    };


/* =====================================================
   ADMIN - MARK CONTACT MESSAGE AS READ
===================================================== */

export const markContactMessageAsRead =
    async (id) => {

        return authRequest(
            `/contact/${id}/read`,
            {
                method: "PUT"
            }
        );
    };


/* =====================================================
   ADMIN - DELETE CONTACT MESSAGE
===================================================== */

export const deleteContactMessage =
    async (id) => {

        return authRequest(
            `/contact/${id}`,
            {
                method: "DELETE"
            }
        );
    };


// =========================================================
// ADMIN PROFILE
// =========================================================

export const getAdminProfile = async () => {

    return authRequest(
        "/admin/profile",
        {
            method: "GET"
        }
    );
};


// =========================================================
// ADMIN UPDATE PROFILE
// =========================================================

export const updateAdminProfile = async (
    profileData
) => {

    return authRequest(
        "/admin/profile",
        {
            method: "PUT",

            body: JSON.stringify(
                profileData
            )
        }
    );
};


// =========================================================
// ADMIN CHANGE PASSWORD
// =========================================================

export const changeAdminPassword = async (
    passwordData
) => {

    return authRequest(
        "/admin/change-password",
        {
            method: "PUT",

            body: JSON.stringify(
                passwordData
            )
        }
    );
};

