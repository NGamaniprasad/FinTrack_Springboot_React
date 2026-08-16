import { useEffect, useState } from "react";

import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} from "../services/api";

import "./Categories.css";


const Categories = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");

    const [type, setType] = useState("INCOME");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =====================================================
    // LOAD CATEGORIES
    // =====================================================

    const loadCategories = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getCategories();

            setCategories(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "LOAD CATEGORIES ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to load categories."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadCategories();

    }, []);


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setName("");
        setType("INCOME");
        setEditingId(null);

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        const trimmedName = name.trim();


        if (!trimmedName) {

            setError(
                "Please enter a category name."
            );

            return;
        }


        try {

            setSaving(true);


            const categoryData = {

                name: trimmedName,

                type: type.toUpperCase()

            };


            // =================================================
            // UPDATE
            // =================================================

            if (editingId) {

                const updated =
                    await updateCategory(
                        editingId,
                        categoryData
                    );


                setCategories((previous) =>
                    previous.map(
                        (category) =>
                            category.id === editingId
                                ? updated
                                : category
                    )
                );


                setSuccess(
                    "Category updated successfully."
                );

            }

            // =================================================
            // ADD
            // =================================================

            else {

                const created =
                    await addCategory(
                        categoryData
                    );


                setCategories((previous) => [

                    created,

                    ...previous

                ]);


                setSuccess(
                    "Category added successfully."
                );
            }


            resetForm();

        } catch (err) {

            console.error(
                "SAVE CATEGORY ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to save category."
            );

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (category) => {

        setEditingId(category.id);

        setName(
            category.name || ""
        );

        setType(
            String(
                category.type || "INCOME"
            ).toUpperCase()
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
                "Are you sure you want to delete this category?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");


            await deleteCategory(id);


            setCategories((previous) =>
                previous.filter(
                    (category) =>
                        category.id !== id
                )
            );


            if (editingId === id) {

                resetForm();

            }


            setSuccess(
                "Category deleted successfully."
            );

        } catch (err) {

            console.error(
                "DELETE CATEGORY ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to delete category."
            );
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <main className="categories-page">

                <div className="categories-container">

                    <div className="categories-loading">
                        Loading categories...
                    </div>

                </div>

            </main>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <main className="categories-page">

            <div className="categories-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="categories-header">

                    <div>

                        <span className="categories-label">
                            FINTRACK
                        </span>

                        <h1>
                            Categories
                        </h1>

                        <p>
                            Organize your income and expenses
                            with custom categories.
                        </p>

                    </div>


                    <div className="categories-summary">

                        <div>

                            <span>
                                Total Categories
                            </span>

                            <strong>
                                {categories.length}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Income
                            </span>

                            <strong>
                                {
                                    categories.filter(
                                        (category) =>
                                            String(
                                                category.type || ""
                                            ).toUpperCase() === "INCOME"
                                    ).length
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Expenses
                            </span>

                            <strong>
                                {
                                    categories.filter(
                                        (category) =>
                                            String(
                                                category.type || ""
                                            ).toUpperCase() === "EXPENSE"
                                    ).length
                                }
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (

                    <div className="categories-error">
                        {error}
                    </div>

                )}


                {success && (

                    <div className="categories-success">
                        {success}
                    </div>

                )}


                {/* =================================================
                    ADD / EDIT FORM
                ================================================= */}

                <section className="categories-form-card">

                    <div className="categories-form-header">

                        <div className="categories-form-icon">
                            #
                        </div>

                        <div>

                            <h2>

                                {editingId
                                    ? "Edit Category"
                                    : "Add Category"
                                }

                            </h2>

                            <p>

                                {editingId
                                    ? "Update your category details."
                                    : "Create a category for your transactions."
                                }

                            </p>

                        </div>

                    </div>


                    <form
                        className="categories-form"
                        onSubmit={handleSubmit}
                    >

                        {/* NAME */}

                        <div className="categories-field">

                            <label htmlFor="categoryName">
                                Category Name
                            </label>

                            <input
                                id="categoryName"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: Salary"
                                maxLength={50}
                                required
                                disabled={saving}
                            />

                        </div>


                        {/* TYPE */}

                        <div className="categories-field">

                            <label htmlFor="categoryType">
                                Category Type
                            </label>

                            <select
                                id="categoryType"
                                value={type}
                                onChange={(e) =>
                                    setType(
                                        e.target.value
                                    )
                                }
                                disabled={saving}
                            >

                                <option value="INCOME">
                                    INCOME
                                </option>

                                <option value="EXPENSE">
                                    EXPENSE
                                </option>

                            </select>

                        </div>


                        {/* BUTTONS */}

                        <div className="categories-form-actions">

                            <button
                                type="submit"
                                className="categories-save-button"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Category"
                                        : "Add Category"
                                }

                            </button>


                            {editingId && (

                                <button
                                    type="button"
                                    className="categories-cancel-button"
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
                    CATEGORY LIST
                ================================================= */}

                <section className="categories-list-section">

                    <div className="categories-list-header">

                        <div>

                            <h2>
                                Your Categories
                            </h2>

                            <p>
                                Manage your income and expense
                                categories.
                            </p>

                        </div>

                    </div>


                    {categories.length === 0 ? (

                        <div className="categories-empty">

                            <div className="categories-empty-icon">
                                #
                            </div>

                            <h3>
                                No categories yet
                            </h3>

                            <p>
                                Create your first category
                                above.
                            </p>

                        </div>

                    ) : (

                        <div className="categories-grid">

                            {categories.map(
                                (category) => {

                                    const categoryType =
                                        String(
                                            category.type || ""
                                        ).toUpperCase();


                                    return (

                                        <div
                                            className="category-card"
                                            key={category.id}
                                        >

                                            <div className="category-card-top">

                                                <div className="category-icon">
                                                    #
                                                </div>


                                                <span
                                                    className={
                                                        categoryType === "INCOME"
                                                            ? "category-type income-type"
                                                            : "category-type expense-type"
                                                    }
                                                >
                                                    {categoryType}
                                                </span>

                                            </div>


                                            <h3>
                                                {category.name}
                                            </h3>


                                            <div className="category-card-actions">

                                                <button
                                                    type="button"
                                                    className="category-edit-button"
                                                    onClick={() =>
                                                        handleEdit(
                                                            category
                                                        )
                                                    }
                                                    disabled={saving}
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    type="button"
                                                    className="category-delete-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            category.id
                                                        )
                                                    }
                                                    disabled={saving}
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
};


export default Categories;