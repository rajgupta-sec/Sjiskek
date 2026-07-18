const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/lookup', async (req, res) => {
    const { number } = req.query;
    
    if (!number || number.length !== 10) {
        return res.status(400).json({ error: "Please provide a valid 10-digit number." });
    }
    
    try {
        const apiResponse = await fetch(`https://api.aerivue.dev/lookup?number=${number}`);
        const fullData = await apiResponse.json();

        // Destructures the data to p po
        // leaving everything else inside 'safeData'
        const { owner, credit, owner, ...safeData } = fullData;

        // Sends only the cleaned data to your Blogger site
        res.json(safeData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from original API" });
    }
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
