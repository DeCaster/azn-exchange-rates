const SearchHistory = require('../models/SearchHistory');

const saveSearchHistory = async (userId, searchType, searchQuery) => {
    try {
        const newSearchHistory = new SearchHistory({
            userId,
            searchType,
            searchQuery,
            date: new Date()
        });
        await newSearchHistory.save();
    } catch (err) {
        console.error('Error saving search history:', err);
    }
};

module.exports = saveSearchHistory;
