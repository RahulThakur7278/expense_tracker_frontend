import { useEffect, useState, useCallback } from "react";
import { getMyExpenses, getExpenseSummary, deleteExpense } from "../api/expense";
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Card,
    CardContent,
    IconButton,
    Pagination,
    Stack,
    Divider,
    Chip,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SummaryCards from "../components/dashboard/SummaryCards";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import FilterSection from "../components/dashboard/FilterSection";

const Dashboard = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    
    // Filters state
    const [filters, setFilters] = useState({
        page: 1,
        category: "All",
        startDate: "",
        endDate: "",
        sortField: "date",
        sortOrder: "desc",
    });

    const fetchData = useCallback(async () => {
        try {
            const [expensesRes, summaryRes] = await Promise.all([
                getMyExpenses(filters),
                getExpenseSummary()
            ]);
            setExpenses(expensesRes.data.expenses);
            setPagination({
                currentPage: expensesRes.data.currentPage,
                totalPages: expensesRes.data.totalPages
            });
            setSummary(summaryRes.data);
        } catch (err) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePageChange = (event, value) => {
        setFilters(prev => ({ ...prev, page: value }));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            try {
                await deleteExpense(id);
                toast.success("Expense deleted");
                fetchData(); // Refresh
            } catch (err) {
                toast.error("Failed to delete expense");
            }
        }
    };

    if (loading && !summary) {
        return (
            <Box className="flex justify-center items-center min-vh-100 h-[80vh]">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "calc(100vh - 64px)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
                        Analytics Overview
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Track and manage your spending habits
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    startIcon={<Add />} 
                    onClick={() => navigate("/add-expense")}
                    sx={{ 
                        borderRadius: "12px", 
                        px: 3, 
                        py: 1, 
                        textTransform: "none", 
                        fontWeight: "bold",
                        boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)"
                    }}
                >
                    Add Expense
                </Button>
            </Box>

            {summary && <SummaryCards summary={summary} />}
            
            {summary && summary.categoryBreakdown.length > 0 && (
                <ExpenseChart data={summary.categoryBreakdown} />
            )}

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Recent Expenses</Typography>
            </Box>

            <FilterSection filters={filters} setFilters={setFilters} />

            {expenses.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 10, bgcolor: "white", borderRadius: "20px", border: "1px dashed #ccc" }}>
                    <Typography color="text.secondary">No expenses match your filters.</Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
                        {expenses.map((expense) => (
                            <Card key={expense._id} sx={{ 
                                borderRadius: "20px", 
                                border: "1px solid #f0f0f0",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "translateY(-4px)" }
                            }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                        <Chip 
                                            label={expense.category} 
                                            size="small" 
                                            sx={{ 
                                                fontWeight: 600, 
                                                bgcolor: "#f3f4f6", 
                                                color: "#374151",
                                                borderRadius: "8px"
                                            }} 
                                        />
                                        <Box>
                                            <IconButton size="small" onClick={() => navigate(`/edit-expense/${expense._id}`)}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" color="error" onClick={() => handleDelete(expense._id)}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{expense.title}</Typography>
                                    <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>₹{expense.amount.toLocaleString()}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {new Date(expense.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                    </Typography>
                                    {expense.notes && (
                                        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary", fontStyle: "italic", bgcolor: "#f9fafb", p: 1, borderRadius: "8px" }}>
                                            "{expense.notes}"
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
                        <Pagination 
                            count={pagination.totalPages} 
                            page={pagination.currentPage} 
                            onChange={handlePageChange} 
                            color="primary" 
                            size="large"
                        />
                    </Stack>
                </>
            )}
        </Box>
    );
};

export default Dashboard;

