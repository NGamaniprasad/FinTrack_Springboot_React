
import { useEffect, useMemo, useState } from "react";

import {
    getCategories,
    getIncomes,
    addIncome,
    updateIncome,
    deleteIncome
} from "../services/api";

import "./Income.css";


const Income = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [incomes, setIncomes] = useState([]);

    const [categories, setCategories] = useState([]);

    const [description, setDescription] = useState("");

    const [amount, setAmount] = useState("");

    const [date, setDate] = useState("");

    const [categoryId, setCategoryId] = useState("");


    const [editingId, setEditingId] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // =====================================================
    // LOAD DATA
    // =====================================================

    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                incomeData,
                categoryData
            ] = await Promise.all([
                getIncomes(),
                getCategories()
            ]);


            setIncomes(
                Array.isArray(incomeData)
                    ? incomeData
                    : []
            );


            const incomeCategories =
                Array.isArray(categoryData)
                    ? categoryData.filter(
                        (category) =>
                            String(
                                category.type || ""
                            ).toUpperCase() === "INCOME"
                    )
                    : [];


            setCategories(
                incomeCategories
            );


        } catch (err) {

            console.error(
                "LOAD INCOME DATA ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to load income data."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadData();

    }, []);


    // =====================================================
    // TOTAL INCOME
    // =====================================================

    const totalIncome = useMemo(() => {

        return incomes.reduce(
            (total, income) => {

                return total +
                    Number(
                        income.amount || 0
                    );

            },
            0
        );

    }, [incomes]);


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setDescription("");
        setAmount("");
        setDate("");
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


        const trimmedDescription =
            description.trim();


        if (!trimmedDescription) {

            setError(
                "Please enter an income description."
            );

            return;
        }


        if (!amount || Number(amount) <= 0) {

            setError(
                "Please enter a valid income amount."
            );

            return;
        }


        if (!date) {

            setError(
                "Please select an income date."
            );

            return;
        }


        if (!categoryId) {

            setError(
                "Please select an income category."
            );

            return;
        }


        try {

            setSaving(true);


            const incomeData = {

                description:
                    trimmedDescription,

                amount:
                    Number(amount),

                date,

                categoryId:
                    Number(categoryId)
            };


            if (editingId) {

                const updated =
                    await updateIncome(
                        editingId,
                        incomeData
                    );


                setIncomes((previous) =>
                    previous.map(
                        (income) =>
                            income.id === editingId
                                ? updated
                                : income
                    )
                );


                setSuccess(
                    "Income updated successfully."
                );

            } else {

                const created =
                    await addIncome(
                        incomeData
                    );


                setIncomes((previous) => [
                    created,
                    ...previous
                ]);


                setSuccess(
                    "Income added successfully."
                );
            }


            resetForm();


        } catch (err) {

            console.error(
                "SAVE INCOME ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to save income."
            );

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (income) => {

        setEditingId(income.id);

        setDescription(
            income.description || ""
        );

        setAmount(
            income.amount ?? ""
        );

        setDate(
            income.date || ""
        );

        setCategoryId(
            income.categoryId
                ? String(income.categoryId)
                : ""
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
                "Are you sure you want to delete this income?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");


            await deleteIncome(id);


            setIncomes((previous) =>
                previous.filter(
                    (income) =>
                        income.id !== id
                )
            );


            if (editingId === id) {
                resetForm();
            }


            setSuccess(
                "Income deleted successfully."
            );


        } catch (err) {

            console.error(
                "DELETE INCOME ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to delete income."
            );
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <main className="income-page">

                <div className="income-container">

                    <div className="income-loading">
                        Loading income...
                    </div>

                </div>

            </main>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <main className="income-page">

            <div className="income-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="income-header">

                    <div>

                        <span className="income-label">
                            FINTRACK
                        </span>

                        <h1>
                            Income
                        </h1>

                        <p>
                            Track your earnings and keep
                            your financial records organized.
                        </p>

                    </div>


                    <div className="income-total-card">

                        <span>
                            Total Income
                        </span>

                        <strong>
                            ₹{totalIncome.toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (

                    <div className="income-error">
                        {error}
                    </div>

                )}


                {success && (

                    <div className="income-success">
                        {success}
                    </div>

                )}


                {/* =================================================
                    ADD / EDIT FORM
                ================================================= */}

                <section className="income-form-card">

                    <div className="income-form-header">

                        <div className="income-form-icon">
                            ₹
                        </div>

                        <div>

                            <h2>
                                {editingId
                                    ? "Edit Income"
                                    : "Add Income"
                                }
                            </h2>

                            <p>
                                {editingId
                                    ? "Update your income details."
                                    : "Record a new income transaction."
                                }
                            </p>

                        </div>

                    </div>


                    <form
                        className="income-form"
                        onSubmit={handleSubmit}
                    >


                        {/* DESCRIPTION */}

                        <div className="income-field income-description-field">

                            <label htmlFor="incomeDescription">
                                Description
                            </label>

                            <input
                                id="incomeDescription"
                                type="text"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: Monthly salary"
                                required
                                disabled={saving}
                            />

                        </div>


                        {/* AMOUNT */}

                        <div className="income-field">

                            <label htmlFor="incomeAmount">
                                Amount
                            </label>

                            <div className="income-amount-input">

                                <span>
                                    ₹
                                </span>

                                <input
                                    id="incomeAmount"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(
                                            e.target.value
                                        )
                                    }
                                    placeholder="0.00"
                                    required
                                    disabled={saving}
                                />

                            </div>

                        </div>


                        {/* DATE */}

                        <div className="income-field">

                            <label htmlFor="incomeDate">
                                Date
                            </label>

                            <input
                                id="incomeDate"
                                type="date"
                                value={date}
                                onChange={(e) =>
                                    setDate(
                                        e.target.value
                                    )
                                }
                                required
                                disabled={saving}
                            />

                        </div>


                        {/* CATEGORY */}

                        <div className="income-field">

                            <label htmlFor="incomeCategory">
                                Income Category
                            </label>

                            <select
                                id="incomeCategory"
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(
                                        e.target.value
                                    )
                                }
                                required
                                disabled={saving}
                            >

                                <option value="">
                                    Select category
                                </option>


                                {categories.map(
                                    (category) => (

                                        <option
                                            key={
                                                category.id
                                            }
                                            value={
                                                category.id
                                            }
                                        >
                                            {category.name}
                                        </option>

                                    )
                                )}

                            </select>


                            {categories.length === 0 && (

                                <small className="income-category-help">
                                    Create an INCOME category
                                    from the Categories page
                                    first.
                                </small>

                            )}

                        </div>


                        {/* BUTTONS */}

                        <div className="income-form-actions">

                            <button
                                type="submit"
                                className="income-save-button"
                                disabled={
                                    saving ||
                                    categories.length === 0
                                }
                            >

                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Income"
                                        : "Add Income"
                                }

                            </button>


                            {editingId && (

                                <button
                                    type="button"
                                    className="income-cancel-button"
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
                    INCOME LIST
                ================================================= */}

                <section className="income-list-section">

                    <div className="income-list-header">

                        <div>

                            <h2>
                                Income History
                            </h2>

                            <p>
                                {incomes.length}{" "}
                                {incomes.length === 1
                                    ? "transaction"
                                    : "transactions"
                                }
                            </p>

                        </div>

                    </div>


                    {incomes.length === 0 ? (

                        <div className="income-empty">

                            <div className="income-empty-icon">
                                ₹
                            </div>

                            <h3>
                                No income recorded
                            </h3>

                            <p>
                                Add your first income
                                transaction above.
                            </p>

                        </div>

                    ) : (

                        <div className="income-table-wrapper">

                            <table className="income-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Description
                                        </th>

                                        <th>
                                            Category
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {incomes.map(
                                        (income) => (

                                            <tr
                                                key={
                                                    income.id
                                                }
                                            >

                                                <td>

                                                    <div className="income-description">

                                                        <strong>
                                                            {
                                                                income.description
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span className="income-category-badge">

                                                        {
                                                            income.categoryName ||
                                                            "Income"
                                                        }

                                                    </span>

                                                </td>


                                                <td>
                                                    {income.date}
                                                </td>


                                                <td>

                                                    <strong className="income-amount">

                                                        +₹
                                                        {Number(
                                                            income.amount ||
                                                            0
                                                        ).toLocaleString(
                                                            "en-IN",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            }
                                                        )}

                                                    </strong>

                                                </td>


                                                <td>

                                                    <div className="income-actions">

                                                        <button
                                                            type="button"
                                                            className="income-edit-button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    income
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="income-delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    income.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
};


export default Income;

