


// export default Budgets;

import { useEffect, useState } from "react";

import {
    getBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
    getCategories
} from "../services/api";

import "./Budgets.css";


const Budgets = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [budgets, setBudgets] = useState([]);

    const [categories, setCategories] = useState([]);

    const [month, setMonth] = useState("");

    const [amount, setAmount] = useState("");

    const [categoryId, setCategoryId] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =====================================================
    // LOAD DATA
    // =====================================================

    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                budgetData,
                categoryData
            ] = await Promise.all([
                getBudgets(),
                getCategories()
            ]);

            console.log(
                "BUDGET DATA:",
                budgetData
            );

            console.log(
                "ALL CATEGORY DATA:",
                categoryData
            );


            const allCategories =
                Array.isArray(categoryData)
                    ? categoryData
                    : [];


            /*
             * Only EXPENSE categories are allowed
             * for budgets.
             */
            const expenseCategories =
                allCategories.filter(
                    category =>
                        String(
                            category.type || ""
                        ).toUpperCase() === "EXPENSE"
                );


            console.log(
                "EXPENSE CATEGORIES:",
                expenseCategories
            );


            setBudgets(
                Array.isArray(budgetData)
                    ? budgetData
                    : []
            );

            setCategories(
                expenseCategories
            );

        } catch (err) {

            console.error(
                "LOAD BUDGET DATA ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to load budgets."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadData();

    }, []);


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setMonth("");

        setAmount("");

        setCategoryId("");

        setEditingId(null);
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        if (!month) {

            setError(
                "Please select a month."
            );

            return;
        }


        if (
            !amount ||
            Number(amount) <= 0
        ) {

            setError(
                "Please enter a valid budget amount."
            );

            return;
        }


        if (!categoryId) {

            setError(
                "Please select an expense category."
            );

            return;
        }


        try {

            setSaving(true);


            const budgetData = {

                month: month,

                amount: Number(amount),

                categoryId: Number(categoryId)
            };


            console.log(
                "SENDING BUDGET:",
                budgetData
            );


            // =================================================
            // UPDATE
            // =================================================

            if (editingId) {

                const updated =
                    await updateBudget(
                        editingId,
                        budgetData
                    );


                setBudgets(
                    previous =>
                        previous.map(
                            budget =>
                                budget.id === editingId
                                    ? updated
                                    : budget
                        )
                );


                setSuccess(
                    "Budget updated successfully."
                );

            }

            // =================================================
            // ADD
            // =================================================

            else {

                const created =
                    await addBudget(
                        budgetData
                    );


                setBudgets(
                    previous => [
                        created,
                        ...previous
                    ]
                );


                setSuccess(
                    "Budget added successfully."
                );
            }


            resetForm();

        } catch (err) {

            console.error(
                "SAVE BUDGET ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to save budget."
            );

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (budget) => {

        setEditingId(
            budget.id
        );


        setMonth(
            budget.month || ""
        );


        setAmount(
            budget.amount || ""
        );


        /*
         * Support different possible backend response shapes.
         */
        const existingCategoryId =
            budget.categoryId ||
            budget.category?.id ||
            "";


        setCategoryId(
            String(existingCategoryId)
        );


        setError("");
        setSuccess("");


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this budget?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");


            await deleteBudget(id);


            setBudgets(
                previous =>
                    previous.filter(
                        budget =>
                            budget.id !== id
                    )
            );


            if (editingId === id) {

                resetForm();
            }


            setSuccess(
                "Budget deleted successfully."
            );

        } catch (err) {

            console.error(
                "DELETE BUDGET ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to delete budget."
            );
        }
    };


    // =====================================================
    // FORMAT CURRENCY
    // =====================================================

    const formatCurrency = (value) => {

        return Number(
            value || 0
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    };


    // =====================================================
    // TOTAL BUDGET
    // =====================================================

    const totalBudget =
        budgets.reduce(
            (
                total,
                budget
            ) =>
                total +
                Number(
                    budget.amount || 0
                ),
            0
        );


    // =====================================================
    // GET CATEGORY NAME
    // =====================================================

    const getCategoryName = (budget) => {

        if (budget.categoryName) {

            return budget.categoryName;
        }


        if (
            budget.category &&
            budget.category.name
        ) {

            return budget.category.name;
        }


        if (budget.categoryId) {

            const category =
                categories.find(
                    item =>
                        Number(item.id) ===
                        Number(
                            budget.categoryId
                        )
                );


            if (category) {

                return category.name;
            }
        }


        return "Expense Category";
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <main className="budgets-page">

                <div className="budgets-container">

                    <div className="budgets-loading">

                        Loading budgets...

                    </div>

                </div>

            </main>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <main className="budgets-page">

            <div className="budgets-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="budgets-header">

                    <div>

                        <span className="budgets-label">
                            FINTRACK
                        </span>

                        <h1>
                            Budgets
                        </h1>

                        <p>
                            Plan your spending by month
                            and expense category.
                        </p>

                    </div>


                    <div className="budgets-summary">

                        <span>
                            Total Budget
                        </span>

                        <strong>
                            ₹
                            {formatCurrency(
                                totalBudget
                            )}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (

                    <div className="budgets-error">

                        {error}

                    </div>

                )}


                {success && (

                    <div className="budgets-success">

                        {success}

                    </div>

                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <section className="budgets-form-card">


                    <div className="budgets-form-header">

                        <div className="budgets-form-icon">
                            ◈
                        </div>


                        <div>

                            <h2>

                                {editingId
                                    ? "Edit Budget"
                                    : "Add Budget"
                                }

                            </h2>

                            <p>

                                Set a spending limit for
                                an expense category.

                            </p>

                        </div>

                    </div>


                    <form
                        className="budgets-form"
                        onSubmit={handleSubmit}
                    >


                        {/* =================================================
                            MONTH
                        ================================================= */}

                        <div className="budgets-field">

                            <label htmlFor="budgetMonth">

                                Month

                            </label>


                            <input
                                id="budgetMonth"
                                type="month"
                                value={month}
                                onChange={(e) =>
                                    setMonth(
                                        e.target.value
                                    )
                                }
                                disabled={saving}
                                required
                            />

                        </div>


                        {/* =================================================
                            EXPENSE CATEGORY
                        ================================================= */}

                        <div className="budgets-field">

                            <label htmlFor="budgetCategory">

                                Expense Category

                            </label>


                            <select
                                id="budgetCategory"
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(
                                        e.target.value
                                    )
                                }
                                disabled={
                                    saving ||
                                    categories.length === 0
                                }
                                required
                            >

                                <option value="">

                                    {categories.length === 0
                                        ? "No expense categories available"
                                        : "Select expense category"
                                    }

                                </option>


                                {categories.map(
                                    category => (

                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >

                                            {category.name}

                                        </option>

                                    )
                                )}

                            </select>


                            {categories.length === 0 && (

                                <small>

                                    Create an EXPENSE category
                                    from the Categories page first.

                                </small>

                            )}

                        </div>


                        {/* =================================================
                            AMOUNT
                        ================================================= */}

                        <div className="budgets-field">

                            <label htmlFor="budgetAmount">

                                Budget Amount

                            </label>


                            <input
                                id="budgetAmount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: 10000"
                                disabled={saving}
                                required
                            />

                        </div>


                        {/* =================================================
                            BUTTONS
                        ================================================= */}

                        <div className="budgets-form-actions">

                            <button
                                type="submit"
                                className="budgets-save-button"
                                disabled={
                                    saving ||
                                    categories.length === 0
                                }
                            >

                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Budget"
                                        : "Add Budget"
                                }

                            </button>


                            {editingId && (

                                <button
                                    type="button"
                                    className="budgets-cancel-button"
                                    onClick={resetForm}
                                    disabled={saving}
                                >

                                    Cancel

                                </button>

                            )}

                        </div>

                    </form>

                </section>


                {/* =================================================
                    BUDGET LIST
                ================================================= */}

                <section className="budgets-list-section">


                    <div className="budgets-list-header">

                        <div>

                            <h2>
                                Your Budgets
                            </h2>

                            <p>
                                Manage your monthly
                                spending limits.
                            </p>

                        </div>

                    </div>


                    {budgets.length === 0 ? (

                        <div className="budgets-empty">

                            <div className="budgets-empty-icon">
                                ◈
                            </div>

                            <h3>
                                No budgets yet
                            </h3>

                            <p>
                                Create your first budget
                                above.
                            </p>

                        </div>

                    ) : (

                        <div className="budgets-grid">

                            {budgets.map(
                                budget => (

                                    <div
                                        className="budget-card"
                                        key={budget.id}
                                    >

                                        <div className="budget-card-top">

                                            <div className="budget-icon">
                                                ◈
                                            </div>

                                            <span>
                                                {budget.month}
                                            </span>

                                        </div>


                                        <h3>

                                            ₹
                                            {formatCurrency(
                                                budget.amount
                                            )}

                                        </h3>


                                        <p>

                                            {getCategoryName(
                                                budget
                                            )}

                                        </p>


                                        <div className="budget-card-actions">

                                            <button
                                                type="button"
                                                className="budget-edit-button"
                                                onClick={() =>
                                                    handleEdit(
                                                        budget
                                                    )
                                                }
                                                disabled={saving}
                                            >

                                                Edit

                                            </button>


                                            <button
                                                type="button"
                                                className="budget-delete-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        budget.id
                                                    )
                                                }
                                                disabled={saving}
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
};


export default Budgets;