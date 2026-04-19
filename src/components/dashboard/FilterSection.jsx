import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const categories = ["All", "Food", "Transport", "Shopping", "Health", "Entertainment", "Utilities", "Other"];

const FilterSection = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 2, 
            mb: 4, 
            p: 3, 
            bgcolor: "white", 
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0",
            alignItems: "center"
        }}>
            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={filters.category}
                    label="Category"
                    onChange={handleChange}
                    size="small"
                >
                    {categories.map(cat => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="From"
                type="date"
                name="startDate"
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
                value={filters.startDate}
                onChange={handleChange}
            />

            <TextField
                label="To"
                type="date"
                name="endDate"
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
                value={filters.endDate}
                onChange={handleChange}
            />

            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                    name="sortField"
                    value={filters.sortField}
                    label="Sort By"
                    onChange={handleChange}
                    size="small"
                >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="amount">Amount</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Order</InputLabel>
                <Select
                    name="sortOrder"
                    value={filters.sortOrder}
                    label="Order"
                    onChange={handleChange}
                    size="small"
                >
                    <MenuItem value="desc">Descending</MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default FilterSection;
