import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Box, Paper, Typography } from "@mui/material";

const COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#4f46e5", "#dc2626"];

const ExpenseChart = ({ data }) => {
    // If data is just group distribution
    const chartData = data.map(item => ({
        name: item._id,
        value: item.total
    }));

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
            <Paper sx={{ 
                p: 3, 
                flex: 1, 
                minWidth: 300, 
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                border: "1px solid #f0f0f0"
            }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Spending by Category</Typography>
                <Box sx={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>

            <Paper sx={{ 
                p: 3, 
                flex: 1, 
                minWidth: 300, 
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                border: "1px solid #f0f0f0"
            }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Category Comparison</Typography>
                <Box sx={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4f46e5" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>
        </Box>
    );
};

export default ExpenseChart;
