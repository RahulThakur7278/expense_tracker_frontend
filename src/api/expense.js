import api from "./axios";

export const createExpense = (data) => api.post("/expenses", data);
export const getMyExpenses = (params) => api.get("/expenses/my", { params });
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
export const getExpenseSummary = () => api.get("/expenses/summary");

export const getAllExpenses = () => api.get("/expenses");
export const updateExpenseStatus = (id, status) =>
  api.patch(`/expenses/${id}/status`, { status });
