import { useEffect, useState } from "react";

import {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getCategories
} from "../services/api";

import "./Expenses.css";


const Expenses = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [expenses, setExpenses] = useState([]);

    const [categories, setCategories] = useState([]);

    const [amount, setAmount] = useState("");

    const [date, setDate] = useState("");

    const [categoryId, setCategoryId] = useState("");

    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =====================================================
    // LOAD EXPENSES + CATEGORIES
    // =====================================================

    const loadData = async () => {

        try {

            setLoading(true);

            setError("");

            const [
                expenseData,
                categoryData
            ] = await Promise.all([
                getExpenses(),
                getCategories()
            ]);


            setExpenses(
                Array.isArray(expenseData)
                    ? expenseData
                    : []
            );


            setCategories(
                Array.isArray(categoryData)
                    ? categoryData.filter(
                        category =>
                            String(category.type || "")
                                .toUpperCase() === "EXPENSE"
                    )
                    : []
            );

        } catch (err) {

            console.error(
                "LOAD EXPENSE DATA ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to load expenses."
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

        setAmount("");

        setDate("");

        setCategoryId("");

        setDescription("");

        setEditingId(null);

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");


        if (!amount || Number(amount) <= 0) {

            setError(
                "Please enter a valid expense amount."
            );

            return;
        }


        if (!date) {

            setError(
                "Please select an expense date."
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


            const expenseData = {

                amount: Number(amount),

                date: date,

                categoryId: Number(categoryId),

                description:
                    description.trim()

            };


            // =================================================
            // UPDATE
            // =================================================

            if (editingId) {

                const updated =
                    await updateExpense(
                        editingId,
                        expenseData
                    );


                setExpenses(previous =>
                    previous.map(expense =>
                        expense.id === editingId
                            ? updated
                            : expense
                    )
                );


                setSuccess(
                    "Expense updated successfully."
                );

            }

            // =================================================
            // ADD
            // =================================================

            else {

                const created =
                    await addExpense(
                        expenseData
                    );


                setExpenses(previous => [

                    created,

                    ...previous

                ]);


                setSuccess(
                    "Expense added successfully."
                );
            }


            resetForm();

        } catch (err) {

            console.error(
                "SAVE EXPENSE ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to save expense."
            );

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (expense) => {

        setEditingId(expense.id);


        setAmount(
            expense.amount || ""
        );


        setDate(
            expense.date ||
            expense.expenseDate ||
            ""
        );


        setCategoryId(
            expense.categoryId ||
            expense.category?.id ||
            ""
        );


        setDescription(
            expense.description || ""
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
                "Are you sure you want to delete this expense?"
            );


        if (!confirmed) {

            return;
        }


        try {

            setError("");

            setSuccess("");


            await deleteExpense(id);


            setExpenses(previous =>
                previous.filter(
                    expense =>
                        expense.id !== id
                )
            );


            if (editingId === id) {

                resetForm();

            }


            setSuccess(
                "Expense deleted successfully."
            );

        } catch (err) {

            console.error(
                "DELETE EXPENSE ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to delete expense."
            );
        }
    };


    // =====================================================
    // FORMAT CURRENCY
    // =====================================================

    const formatCurrency = (value) => {

        return Number(value || 0).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    };


    // =====================================================
    // GET CATEGORY NAME
    // =====================================================

    const getCategoryName = (expense) => {

        if (expense.categoryName) {

            return expense.categoryName;

        }


        if (expense.category?.name) {

            return expense.category.name;

        }


        const category =
            categories.find(
                item =>
                    Number(item.id) ===
                    Number(
                        expense.categoryId
                    )
            );


        return category?.name ||
            "Expense Category";
    };


    // =====================================================
    // TOTAL EXPENSE
    // =====================================================

    const totalExpense =
        expenses.reduce(
            (total, expense) =>
                total +
                Number(
                    expense.amount || 0
                ),
            0
        );


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <main className="expenses-page">

                <div className="expenses-container">

                    <div className="expenses-loading">

                        Loading expenses...

                    </div>

                </div>

            </main>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <main className="expenses-page">

            <div className="expenses-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="expenses-header">

                    <div>

                        <span className="expenses-label">
                            FINTRACK
                        </span>

                        <h1>
                            Expenses
                        </h1>

                        <p>
                            Track and manage your
                            daily expenses.
                        </p>

                    </div>


                    <div className="expenses-summary">

                        <span>
                            Total Expenses
                        </span>

                        <strong>
                            ₹{formatCurrency(
                                totalExpense
                            )}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (

                    <div className="expenses-error">
                        {error}
                    </div>

                )}


                {success && (

                    <div className="expenses-success">
                        {success}
                    </div>

                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <section className="expenses-form-card">

                    <div className="expenses-form-header">

                        <div className="expenses-form-icon">
                            ₹
                        </div>

                        <div>

                            <h2>

                                {editingId
                                    ? "Edit Expense"
                                    : "Add Expense"
                                }

                            </h2>

                            <p>

                                {editingId
                                    ? "Update your expense details."
                                    : "Record a new expense."
                                }

                            </p>

                        </div>

                    </div>


                    <form
                        className="expenses-form"
                        onSubmit={handleSubmit}
                    >


                        {/* AMOUNT */}

                        <div className="expenses-field">

                            <label htmlFor="expenseAmount">
                                Amount
                            </label>

                            <input
                                id="expenseAmount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: 500"
                                disabled={saving}
                                required
                            />

                        </div>


                        {/* DATE */}

                        <div className="expenses-field">

                            <label htmlFor="expenseDate">
                                Date
                            </label>

                            <input
                                id="expenseDate"
                                type="date"
                                value={date}
                                onChange={(e) =>
                                    setDate(
                                        e.target.value
                                    )
                                }
                                disabled={saving}
                                required
                            />

                        </div>


                        {/* CATEGORY */}

                        <div className="expenses-field">

                            <label htmlFor="expenseCategory">
                                Expense Category
                            </label>

                            <select
                                id="expenseCategory"
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(
                                        e.target.value
                                    )
                                }
                                disabled={saving}
                                required
                            >

                                <option value="">
                                    Select category
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

                        </div>


                        {/* DESCRIPTION */}

                        <div className="expenses-field expenses-description-field">

                            <label htmlFor="expenseDescription">
                                Description
                            </label>

                            <input
                                id="expenseDescription"
                                type="text"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: Lunch at restaurant"
                                maxLength={200}
                                disabled={saving}
                            />

                        </div>


                        {/* BUTTONS */}

                        <div className="expenses-form-actions">

                            <button
                                type="submit"
                                className="expenses-save-button"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Expense"
                                        : "Add Expense"
                                }

                            </button>


                            {editingId && (

                                <button
                                    type="button"
                                    className="expenses-cancel-button"
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
                    EXPENSE LIST
                ================================================= */}

                <section className="expenses-list-section">

                    <div className="expenses-list-header">

                        <div>

                            <h2>
                                Your Expenses
                            </h2>

                            <p>
                                Manage your recorded
                                expenses.
                            </p>

                        </div>

                    </div>


                    {expenses.length === 0 ? (

                        <div className="expenses-empty">

                            <div className="expenses-empty-icon">
                                ₹
                            </div>

                            <h3>
                                No expenses yet
                            </h3>

                            <p>
                                Add your first expense
                                above.
                            </p>

                        </div>

                    ) : (

                        <div className="expenses-grid">

                            {expenses.map(
                                expense => (

                                    <div
                                        className="expense-card"
                                        key={expense.id}
                                    >

                                        <div className="expense-card-top">

                                            <div className="expense-icon">
                                                ₹
                                            </div>

                                            <span>
                                                {
                                                    expense.date ||
                                                    expense.expenseDate ||
                                                    ""
                                                }
                                            </span>

                                        </div>


                                        <h3>
                                            ₹{formatCurrency(
                                                expense.amount
                                            )}
                                        </h3>


                                        <p className="expense-category">

                                            {getCategoryName(
                                                expense
                                            )}

                                        </p>


                                        {expense.description && (

                                            <p className="expense-description">

                                                {
                                                    expense.description
                                                }

                                            </p>

                                        )}


                                        <div className="expense-card-actions">

                                            <button
                                                type="button"
                                                className="expense-edit-button"
                                                onClick={() =>
                                                    handleEdit(
                                                        expense
                                                    )
                                                }
                                                disabled={saving}
                                            >
                                                Edit
                                            </button>


                                            <button
                                                type="button"
                                                className="expense-delete-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        expense.id
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


export default Expenses;