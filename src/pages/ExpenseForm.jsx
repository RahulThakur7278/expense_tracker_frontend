import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createExpense, updateExpense, getMyExpenses } from "../api/expense";
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Paper,
    CircularProgress,
} from "@mui/material";
import { toast } from "react-hot-toast";

const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Health",
    "Entertainment",
    "Utilities",
    "Other",
];

const ExpenseForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    const [form, setForm] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
        notes: "",
    });

    useEffect(() => {
        if (id) {
            const fetchExpense = async () => {
                setFetching(true);
                try {
                    // Reusing getMyExpenses might be tricky if it's paginated, 
                    // ideally we should have a getExpenseById endpoint, 
                    // but for now we'll fetch all and filter or just trust the backend.
                    // Actually, let's just use the update method to see if it exists.
                    // Instead of a separate fetch, we could pass data via state, 
                    // but deep linking requires fetching.
                    const res = await getMyExpenses({ limit: 1000 });
                    const expense = res.data.expenses.find(e => e._id === id);
                    if (expense) {
                        setForm({
                            title: expense.title || "",
                            category: expense.category,
                            amount: expense.amount,
                            date: new Date(expense.date).toISOString().split("T")[0],
                            notes: expense.notes || "",
                        });
                    }
                } catch (err) {
                    toast.error("Failed to fetch expense details");
                } finally {
                    setFetching(false);
                }
            };
            fetchExpense();
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const amountValue = parseFloat(form.amount);
        if (isNaN(amountValue) || amountValue <= 0) {
            toast.error("Amount must be greater than zero");
            setLoading(false);
            return;
        }

        try {
            if (id) {
                await updateExpense(id, form);
                toast.success("Expense updated");
            } else {
                await createExpense(form);
                toast.success("Expense added");
            }
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Submission failed");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Box className="flex justify-center items-center h-screen">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50 py-10">
            <Paper elevation={3} className="p-8 w-full max-w-md rounded-2xl">
                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 800, mb: 4, color: "#1a1a1a" }}>
                    {id ? "Edit Expense" : "Add New Expense"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            label="What did you spend on?"
                            placeholder="e.g. Weekly Groceries"
                            name="title"
                            fullWidth
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            select
                            label="Category"
                            name="category"
                            fullWidth
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Amount (₹)"
                            type="number"
                            name="amount"
                            fullWidth
                            value={form.amount}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Date"
                            type="date"
                            name="date"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}
                            value={form.date}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Optional Notes"
                            name="notes"
                            fullWidth
                            multiline
                            rows={3}
                            value={form.notes}
                            onChange={handleChange}
                            placeholder="Any extra details..."
                        />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            fullWidth
                            disabled={loading}
                            sx={{ 
                                py: 1.5, 
                                borderRadius: "12px", 
                                fontWeight: "bold",
                                textTransform: "none",
                                fontSize: "1.1rem",
                                mt: 2
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : (id ? "Update Expense" : "Save Expense")}
                        </Button>
                        
                        <Button 
                            variant="text" 
                            fullWidth
                            onClick={() => navigate("/dashboard")}
                            sx={{ textTransform: "none", color: "text.secondary" }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default ExpenseForm;

