import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { TrendingUp, AccountBalanceWallet, Category } from "@mui/icons-material";

const SummaryCards = ({ summary }) => {
    const cards = [
        {
            title: "Total Spent (Month)",
            value: `₹${summary.totalThisMonth.toLocaleString()}`,
            icon: <TrendingUp sx={{ color: "#2563eb", fontSize: 40 }} />,
            bg: "#eff6ff",
        },
        {
            title: "Total Spent (Year)",
            value: `₹${summary.totalThisYear.toLocaleString()}`,
            icon: <AccountBalanceWallet sx={{ color: "#7c3aed", fontSize: 40 }} />,
            bg: "#f5f3ff",
        },
        {
            title: "Highest Category",
            value: summary.highestCategory,
            icon: <Category sx={{ color: "#db2777", fontSize: 40 }} />,
            bg: "#fdf2f8",
        },
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {cards.map((card, index) => (
                <Grid item xs={12} sm={4} key={index}>
                    <Card sx={{ 
                        borderRadius: "20px", 
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                        border: "1px solid #f0f0f0"
                    }}>
                        <CardContent sx={{ display: "flex", alignItems: "center", p: 3 }}>
                            <Box sx={{ 
                                p: 1.5, 
                                borderRadius: "16px", 
                                bgcolor: card.bg, 
                                display: "flex", 
                                mr: 2 
                            }}>
                                {card.icon}
                            </Box>
                            <Box>
                                <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 600 }}>
                                    {card.title}
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                                    {card.value}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default SummaryCards;
