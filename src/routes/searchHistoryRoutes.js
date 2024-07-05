const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistory');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware kullanımı doğru bir şekilde tanımlanmış olmalıdır
router.post('/', authMiddleware, async (req, res) => {
    const { searchType, searchQuery } = req.body;
    const userId = req.user.id;

    try {
        const newSearchHistory = new SearchHistory({
            userId,
            searchType,
            searchQuery,
            date: new Date()
        });
        await newSearchHistory.save();
        res.status(201).json(newSearchHistory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
