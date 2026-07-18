const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allows Blogger to safely communicate with this server

app.get('/api/lookup', async (req, res) => {
    const { number } = req.query;
    
    if (!number || number.length !== 10) {
        return res.status(400).json({ error: "Please provide a valid 10-digit number." });
    }
    
    try {
        // 1. Fetching securely away from the browser
        const apiResponse = await fetch(`https://api.aerivue.dev/lookup?number=${number}`);
        const fullData = await apiResponse.json();

        // 2. Currently sending all data. We will edit this step later to hide things!
        res.json(fullData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from original API" });
    }
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
